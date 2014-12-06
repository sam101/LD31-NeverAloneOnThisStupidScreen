function Network() {
    this.socket = io.connect();
    var gameId;
    if (gameId == undefined) {
        gameId = this.generateGameId(function(gameId) {
            localStorage.setItem('gameId', gameId);
            this.socket.emit('login', gameId);
        });
    }
    else {
        this.socket.emit('login', gameId);
    }
}

Network.prototype.generateGameId = function(callback) {
    var self = this;
    this.socket.emit('generateName');
    this.socket.on('name', function(name) {
        callback.call(self, name);
    })
}


var network = new Network();