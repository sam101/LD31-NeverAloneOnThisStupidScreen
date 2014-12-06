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
    callback.call(this, 'pinkraspberry');
}


var network = new Network();