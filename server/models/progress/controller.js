class Progress {
  constructor() {
    this.socket = null;
  }

  getSocket() {
    return this.socket;
  }

  send(data) {
    this.socket &&
    this.socket.readyState === this.socket.OPEN &&
    this.socket.send(JSON.stringify(data));
  }

  setSocket(socket) {
    this.socket = socket;
  }
};

module.exports = new Progress();
