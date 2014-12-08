"use strict";

function Network() {
    this.socket = io.connect();
    this.handleConnexion();
}
Network.prototype.handleConnexion = function() {
    if (window.location.hash == '#returning') {
       this.playerName = prompt("What's your (VALID) username ?");
    }
    else {
        this.playerName = localStorage.getItem('playerName');
    }
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

    this.socket.on('disconnect', function() {
        if (game.isLaunched) {
            game.gotDisconnected();
        }
    });

    this.socket.on('initialData', function(initialData) {
        game.startGame(initialData);
    })

    this.socket.on('data', function(data) {
        if (game.isLaunched) {
            world.updateData(data);
        }
    });

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

    this.socket.on('monsterData', function(monsterData) {
        if (game.isLaunched) {
            world.updateMonster(monsterData);
        }
    });

    this.socket.on('removeMonster', function(monsterData) {
        if (game.isLaunched) {
            world.removeMonster(monsterData);
        }
    });

    this.socket.on('laserData', function(data) {
        if (game.isLaunched) {
            world.addLaser(data);
        }
    });

    this.socket.on('wrongUsername', function() {
        localStorage.removeItem('playerName');
        game.invalidUsername();
    });

    this.socket.on('death', function() {
        if (game.isLaunched) {
            game.endGame();
        }
    });

    this.socket.on('winGame', function() {
        if (game.isLaunched) {
            game.winGame();
            this.socket.disconnect();
        }
    });

    this.socket.on('alreadyConnected', function(){
        game.alreadyConnectedFromSomewhereElse();
        this.socket.disconnect();
    });

    this.socket.on('damageTaken', function() {
        if (game.isLaunched) {
            world.player.damageTaken();
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
var network;
$(window).bind("load", function() {
    network = new Network();
});
