/* eslint-disable */
const { get, set, uniq } = require('lodash');
const { sign } = require('ethjs-signer');
const SignerProvider = require('ethjs-provider-signer');
const nodeEth = require('node-eth-address');
const Web3 = require('web3');

const Logger = require('../models/logger');
const Progress = require('../models/progress/controller');
const contractInterface = require('./interface.json');

class Contract {
  /**
   * @param {string} web3
   */
  constructor(url) {
    const provider = new SignerProvider(url, {
      accounts: async cb => {
        const Database = await require('../database').get();
        const documents = await Database.collections.accounts.find().exec();

        cb(null, documents && documents.map((document) => document.get('hash').replace('0x', '')));
      },
      signTransaction: (rawTx, cb) => {
        const account = this.account[get(rawTx, 'from')];

        Logger.info('Sign transaction', { rawTx });

        if (this.newTransaction && account) {
          // Set to current transaction nonce
          rawTx.nonce = account.transactionCount + account.nonce;
          // Increase current account nonce
          account.nonce++;
          // Get new nonce
          const nonce = get(rawTx, 'nonce');
          const setNonce = get(this.newTransaction, 'setNonce');
          // To synchronize the request with the transaction
          setNonce && setNonce(nonce);

          account.transaction[nonce] = {
            ...this.newTransaction,
            callback: false,
            hash: get(rawTx, 'nonce'),
            transaction: rawTx,
            type: 'confirm',
          };

          Logger.info(`Transaction "${nonce}" ready to confirm`, { transaction: get(account, `transaction.${nonce}`)});

          this.send(get(account, `transaction.${nonce}`));
          this.newTransaction = {};

          set(account, `transaction.${nonce}.callback`, cb);
        } else {
          Logger.error('Can\'t find account!')
        }
      },
    });

    let web3;

    try {
      web3 = new Web3(provider);
      Logger.info('Initialized provider');
    } catch(e) {
      Logger.error('Initialized provider failed', { error: e.message });
    }

    this.account = {};
    this.currentAccount = null;
    this.contract = new web3.eth.Contract(
      contractInterface,
      '0x22d1b55ebb5bcd17084c3c9d690056875263fec1',
    );
    this.newTransaction = {};
    this.transaction = {};
    this.socket = null;
    this.web3 = web3;
  }

  /**
   * @param {string} method
   * @param {*} args
   */
  callMethod(method, ...args) {
    return this.contract.methods[method](...args).call();
  }

  /**
   * @param {string} account
   * @param {string} privateKey
   * @param {string} transactions
   * @return {string}
   */
  confirm({ account: address, privateKey, transactions }, callback) {
    const account = get(this.account, address);

    if (account) {
      transactions.forEach(transactionHash => {
        const cb = get(account, `transaction.${transactionHash}.callback`);
        const rawTx = get(account, `transaction.${transactionHash}.transaction`);

        Logger.info(`Confirm transaction: ${transactionHash}`, { account, rawTx });

        if (cb && rawTx && privateKey) {
          this.web3.eth.estimateGas({ ...rawTx, nonce: `0x${rawTx.nonce.toString(16)}`})
            .then(gas => {
              rawTx.gas = gas;
              rawTx.gasPrice = this.web3.utils.toWei('10', 'gwei');

              Logger.info('Estimate Gas success!', { transactionHash, rawTx });

              cb(null, sign(rawTx, privateKey));
            })
            .catch((e) => Logger.error('Estimate Gas failed!', { error: e.message }));
        }
      });
    }

    callback && callback();
  }

  /**
   * @param {string} account
   * @param {string} password
   * @return {string}
   */
  async getPrivateKey(hash, password) {
    const Database = await require('../database').get();
    const query = await Database.collections.accounts
      .find()
      .where('hash')
      .eq(hash)
      .exec();

    return query && query.length > 0
      ? nodeEth.recoverPrivateKey(password, query[0].toJSON().json)
      : false;
  }

  getSocket() {
    return this.socket;
  }

  getTransactionProgress(account, hash, nonce) {
    const { action, entity, payload } = get(this.account, `${account}.transaction.${nonce}`, {});
    const entityHash = get(payload, 'hash');
    const name = get(payload, 'name');

    return {
      count: 24,
      id: nonce,
      link: `${entity}_${entityHash}`,
      title: `${action[0].toUpperCase() + action.slice(1)} ${entity.slice(0, entity === 'indexes' ? -2 : -1)}: «${name}»`,
      subTitle: `txHash: ${hash.substr(0, 24)}`,
    };
  }

  /**
   * @param {string} any
   */
  send(data) {
    this.socket &&
    this.socket.readyState === this.socket.OPEN &&
    this.socket.send(JSON.stringify(data));
  }

  /**
   * @param {string} method
   * @param {*} args
   */
  sendMethod(account, method, { data, ...props }) {
    this.updateAccount(account);
    let transactionNonce;
    let transactionHash;

    Logger.info('Send method', { account, method, data, props });

    this.newTransaction = {
      ...props,
      setNonce: (nonce) => {
        transactionNonce = nonce;
      },
    };

    return this.contract.methods[method].apply(this, data).send()
      .on('confirmation', (number, receipt) => {
        if (number === 24) {
        this.web3.eth.getTransactionCount(account)
          .then(res => {
            this.account[account].nonce = 0;
            this.account[account].transactionCount = res;
          });
        }

        Progress.send({
          ...this.getTransactionProgress(account, transactionHash, transactionNonce),
          current: number,
          type: number === 24 ? 'success' : 'progress',
          value: number * 100 / 24,
        });
      })
      .on('receipt', (receipt) => console.log(receipt))
      .on('transactionHash', (hash) => {
        transactionHash = hash;

        Progress.send({
          ...this.getTransactionProgress(account, transactionHash, transactionNonce),
          current: 0,
          type: 'progress',
          value: 0,
        });
      })
      .on('error', (error) => console.log(123));
  }

  /**
   * @param {Object} account
   */
  setSocket(socket) {
    this.socket = socket;
    this.send({ data: 'Contract socket is connected!' });
  }

  /**
   * @param {string} account
   */
  updateAccount(account) {
    if (account !== this.currentAccount) {
      this.account[account] = {
        address: account,
        nonce: 0,
        transaction: {},
        transactionCount: 0,
      };
      this.currentAccount = account;

      this.contract = new this.web3.eth.Contract(
        contractInterface,
        '0x22d1b55ebb5bcd17084c3c9d690056875263fec1',
        { from: account },
      );

      this.web3.eth.getTransactionCount(account)
        .then(res => {
          this.account[account].transactionCount = res;
        });
    }
  }
}

module.exports = new Contract('https://rinkeby.infura.io/v3/5915e2ed5f234c2aba3dfcb23b8f4337');
