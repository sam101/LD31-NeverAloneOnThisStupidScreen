"use strict";

var tools = require('./tools');

function Monster(world) {
    this.data = {};
    this.world = world;
    this.generateInitialPosition();
}

Monster.prototype.generateInitialPosition = function() {
    do {
        var x = tools.randInt(0, this.world.width);
        var y = tools.randInt(0, this.world.height);
    } while (! this.world.isTileAvailable(x, y));
    this.world.addMonster(this, x, y);
};


Monster.prototype.move = function(x,y) {
    this.data.x = x;
    this.data.y = y;
}

module.exports = Monster;