class Logger {
  constructor() {
    this.socket = null;
  }

  getSocket() {
    return this.socket;
  }

  error(message, data) {
    this.send({
      data, message,
      type: 'error',
    })
  }

  info(message, data) {
    this.send({
      data, message,
      type: 'info',
    });
  }

  send({ data, message, type }) {
    console.log(
      '\x1b[36m%s',
      '[logger]',
      type === 'error'
        ? '\x1b[31m'
        : type === 'success'
          ? '\x1b[32m'
          : '\x1b[36m',
      message);

    data && console.log(data);

    this.socket &&
    this.socket.readyState === this.socket.OPEN &&
    this.socket.send(JSON.stringify({ data, message, type }));
  }

  setSocket(socket) {
    this.socket = socket;
  }

  success(message, data) {
    this.send({
      data, message,
      type: 'success',
    });
  }
}

module.exports = new Logger();
