"use strict";
var common = require('./common');
var worldGenerator = require('./worldGenerator');

var Player = require('./player');

function World(id) {
    this.id = id;
    this.width = common.WIDTH;
    this.height = common.HEIGHT;
    this.size = 0;
    this.players = {};
    this.playersBySocket = {};
    this.monsters = {};

    console.log("Just built a world with id " + id + "(" + this.width + "," + this.height + ")");
}

World.prototype.isFull = function() {
    return this.size >= common.PLAYERS_PER_WORLD;
}

World.prototype.generate = function() {
    this.tiles = worldGenerator.generate(this.width, this.height);
}

World.prototype.addPlayer = function(socket, gameid, callback) {
    if (this.size == 0) {
        this.generate();
    }
    this.size++;

    var player = new Player(socket, gameid, this);
    this.players[socket.id] = player;

    this.sendDataToPlayer(player);

    callback();

}

World.prototype.getPlayer = function(socket) {
    return this.players[socket.id];
}

World.prototype.sendDataToPlayer = function(player) {
    var initialData = {
        tiles: this.tiles
    };

    player.socket.emit('initialData', initialData);
}


module.exports = World;