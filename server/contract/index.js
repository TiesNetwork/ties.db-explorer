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
      accounts: cb => cb(null, []),
      signTransaction: (rawTx, cb) => console.log(123, rawTx, cb),
    });

    const web3 = new Web3(provider);

    this.contract = new web3.eth.Contract(
      contractInterface,
      '0x22d1b55ebb5bcd17084c3c9d690056875263fec1',
      { from: account },
    );
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
   * @param {string} method
   * @param {*} args
   */
  sendMethod(method, ...args) {
    return this.contract.methods[method](...args).send();
  }
}

module.exports = new Contract(null, null, 'https://rinkeby.infura.io/v3/5915e2ed5f234c2aba3dfcb23b8f4337');
