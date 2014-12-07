"use strict";
var common = require('./common');
var formula = require('./formula');
var tools = require('./tools');

function Player(socket, name, world) {
    this.name = name;
    this.socket = socket;
    this.world = world;

    this.data = {};

    this.data.name = name;
    this.data.sprite = 0;
    this.data.level = 1;
    this.data.hp = formula.hpForLevel(this.data.level);
    this.data.hpMax = formula.hpForLevel(this.data.level);

    this.data.exp = 0;
    this.data.expToNextLevel = formula.expForLevel(this.data.level);

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
};

module.exports = Player;