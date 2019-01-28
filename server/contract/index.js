/* eslint-disable */
const { get, uniq } = require('lodash');
const SignerProvider = require('ethjs-provider-signer');
const Web3 = require('web3');

const contractInterface = require('./interface.json');

class Contract {
  /**
   * @param {string} web3
   */
  constructor(url) {
    const provider = new SignerProvider(url, {
      accounts: async cb => {
        const Database = await require('../../database').get();
        const documents = await Database.collections.accounts.find().exec();

        cb(null, documents && documents.map((document) => document.get('hash').replace('0x', '')));
      },
      signTransaction: (rawTx, cb) => {
        const account = this.account[get(rawTx, 'from')];

        if (account) {
          // Increase current account nonce
          account.nonce++;
          // Set to current transaction nonce
          rawTx.nonce = account.transactionCount + account.nonce;

          this.send({
            ...this.confirm,
            hash: get(rawTx, 'nonce'),
            transaction: rawTx,
            type: 'confirm',
          });

          this.confirm = {};
          this.transaction[get(rawTx, 'nonce')] = cb;
        }
      },
    });
    const web3 = new Web3(provider);

    this.account = {};
    this.currentAccount = null;
    this.contract = null;
    this.confirm = {};
    this.transaction = {};
    this.socket = null;
    this.web3 = web3;
  }

  /**
   * @param {string} method
   * @param {*} args
   */
  callMethod(method, ...args) {
    this.updateContract();
    return this.contract.methods[method](...args).call();
  }

  getSocket() {
    return this.socket;
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

    this.confirm = { ...props };

    return this.contract.methods[method].apply(this, data).send()
      .on('confirmation', (number, receipt) => console.log(number, receipt))
      .on('receipt', (receipt) => console.log(receipt))
      .on('transactionHash', (hash) => console.log(hash))
      .on('error', console.error);
  }

  /**
   * @param {Object} account
   */
  setSocket(socket) {
    this.socket = socket;
  }

  /**
   * @param {string} account
   */
  updateAccount(account) {
    if (account !== this.currentAccount) {
      this.account[account] = {
        address: account,
        nonce: 0,
        transactionCount: 0,
      };
      this.currentAccount = account;

      this.contract = new this.web3.eth.Contract(
        contractInterface,
        '0x22d1b55ebb5bcd17084c3c9d690056875263fec1',
        { from: account },
      );
    }

    this.web3.eth.getTransactionCount(account)
      .then(res => { this.account[account].transactionCount = res; });
  }
}

module.exports = new Contract('https://rinkeby.infura.io/v3/5915e2ed5f234c2aba3dfcb23b8f4337');
