"use strict";

function Network() {
    this.socket = io.connect();
    this.handleConnexion();
}
Network.prototype.handleConnexion = function() {
    if (this.playerName == undefined) {
        this.playerName = this.generatePlayerName(function(playerName) {
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

    this.socket.on('initialData', function(initialData) {
        game.startGame(initialData);
    })

    this.socket.on('playerData', function(playerData) {
        if (game.isLaunched) {
            world.updatePlayerData(playerData);
        }
    });

    this.socket.on('removePlayer', function(name) {
        if (game.isLaunched) {
            world.removePlayer(name);
        }
    });


}

Network.prototype.generatePlayerName = function(callback) {
    var self = this;
    this.socket.emit('generateName');
    this.socket.on('name', function(name) {
        callback.call(self, name);
    })
}


var network = new Network();