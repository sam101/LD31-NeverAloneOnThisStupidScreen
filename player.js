"use strict";
var common = require('./common');
var tools = require('./tools');

function Player(socket, name, world) {
    this.name = name;
    this.socket = socket;
    this.world = world;

    this.generateInitialPosition();
}

Player.prototype.generateInitialPosition = function() {
    var xLeftBoundary = common.WIDTH / 4;
    var xRightBoundary = common.WIDTH / 4 * 3;
    var yTopBoundary = common.HEIGHT / 4;
    var yBottomBoundary = common.HEIGHT / 4 * 3;

    var x = tools.randInt(xLeftBoundary, xRightBoundary);
}

module.exports = Player;