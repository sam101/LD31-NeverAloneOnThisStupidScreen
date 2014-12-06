"use strict";
var common = require('./common');
var tools = require('./tools');

function Player(socket, name, world) {
    this.name = name;
    this.socket = socket;
    this.world = world;

    this.data = {};

    this.data.sprite = 0;

    this.generateInitialPosition();
}

Player.prototype.generateInitialPosition = function() {
    do {
        var x = tools.randInt(0, this.world.width);
        var y = tools.randInt(0, this.world.height);
    } while (! this.world.isTileAvailable(x, y));
    this.world.addPlayerToPosition(this, x, y);
};

Player.prototype.move = function(x, y) {
    this.data.x = x;
    this.data.y = y;
}

module.exports = Player;