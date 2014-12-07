"use strict";
var common = require('./common');

var nextId = 0;

function Laser(world, x, y, direction) {
    this.data = {};
    this.data.id = nextId++;
    this.data.x = x;
    this.data.y = y;
    this.data.direction = direction;
    this.world = world;
}

Laser.prototype.step = function() {
    var newX = this.data.x, newY = this.data.y;
    switch (this.data.direction) {
        case common.DIRECTIONS.LEFT:
            newX--;
        break;
        case common.DIRECTIONS.RIGHT:
            newX++;
        break;
        case common.DIRECTIONS.TOP:
            newY--;
        break;
        case common.DIRECTIONS.BOTTOM:
            newY++;
        break;
    }
    this.data.x = newX;
    this.data.y = newY;
    if (this.world.entities[newY][newX] != undefined) {
        this.world.shootEntity(this);
        this.world.removeLaser(this);
    }
    else if (! this.world.isTileAvailable(newX, newY)) {
        this.world.removeLaser(this);
    }
};

module.exports = Laser;