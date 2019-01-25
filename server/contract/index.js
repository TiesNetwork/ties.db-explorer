const { get, uniq } = require('lodash');
const SignerProvider = require('ethjs-provider-signer');
const Web3 = require('web3');

const contractInterface = require('./interface.json');

class Contract {
  /**
   * @param {string} account
   * @param {string} address
   * @param {string} web3
   */
  constructor(account, address, url) {
    const provider = new SignerProvider(url, {
      accounts: cb => cb(null, this.accounts),
      signTransaction: (rawTx, cb) => {
        this.send({
          ...this.confirm,
          hash: get(rawTx, 'nonce'),
          transaction: rawTx,
          type: 'confirm',
        });

        this.confirm = {};
        this.transaction[get(rawTx, 'nonce')] = cb;
      },
    });

    const web3 = new Web3(provider);

    this.accounts = ['ad9f6a020fa81297b9cb29c271e3816f27c9331f'];
    this.confirm = {};
    this.contract = new web3.eth.Contract(
      contractInterface,
      '0x22d1b55ebb5bcd17084c3c9d690056875263fec1',
      { from: account },
    );
    this.nonce = 0;
    this.transaction = {};
    this.socket = null;
    this.web3 = web3;
  }

  /**
   * @param {string} account
   */
  addAccount(account) {
    this.accounts = uniq([...this.accounts, account])
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
   */
  deleteAccount(account) {
    this.accounts = this.accounts.filter((hash) => account !== hash);
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
  sendMethod(method, { data, ...props }) {
    this.confirm = { ...props };

    return this.contract.methods[method].apply(this, data).send()
      .on('confirmation', (number, receipt) => console.log(number, receipt))
      .on('receipt', (receipt) => console.log(receipt))
      .on('transactionHash', (hash) => console.log(hash))
      .on('error', console.error);
  }

  setSocket(socket) {
    this.socket = socket;
  }
}

module.exports = new Contract('0x8dE2472FA85d214f79207F5B310f1335Bca0dc75', null, 'https://rinkeby.infura.io/v3/5915e2ed5f234c2aba3dfcb23b8f4337');
