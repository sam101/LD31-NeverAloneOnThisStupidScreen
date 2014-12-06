function Network() {
    this.socket = io.connect();
    this.handleConnexion();
}
Network.prototype.handleConnexion = function() {
    this.playerName;
    if (this.playerName == undefined) {
        playerName = this.generatePlayerName(function(playerName) {
            this.playerName = playerName;
            localStorage.setItem('playerName', playerName);
            this.connect();
        });
    }
    else {
        this.connect();
    }
}
Network.prototype.connect = function() {
    console.log("Logging in as " + this.playerName);
    this.socket.emit('login', this.playerName);
}

Network.prototype.generatePlayerName = function(callback) {
    var self = this;
    this.socket.emit('generateName');
    this.socket.on('name', function(name) {
        callback.call(self, name);
    })
}


var network = new Network();