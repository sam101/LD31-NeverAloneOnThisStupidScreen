function Network() {
    this.socket = io.connect();
}


var network = new Network();