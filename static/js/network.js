function Network() {
    this.socket = io.connect();
    this.socket.emit('login', 'bob42');
}


var network = new Network();