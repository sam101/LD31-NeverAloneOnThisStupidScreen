"use strict";
var common = require('./common');
var formula = require('./formula');

var nextId = 0;

function Laser(world, origin, x, y, direction) {
    this.data = {};
    this.data.attack = formula.attackForLevel(origin.data.level);
    this.data.id = nextId++;
    this.data.x = x;
    this.data.y = y;
    this.data.direction = direction;
    this.world = world;
    this.origin = origin;

    this.steps = 0;

    if (origin.isPlayer) {
        this.data.sprite = 0;
    }
    else {
        this.data.sprite = 1;
    }
}

Laser.prototype.step = function() {
    this.steps++;
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
        if (this.steps <= common.DECAY_LASER) {
            this.origin.removeLaser();
        }
        this.world.shootEntity(this);
        this.world.removeLaser(this);
    }
    else if (! this.world.isTileAvailable(newX, newY)) {
        if (this.steps <= common.DECAY_LASER) {
            this.origin.removeLaser();
        }
        this.world.removeLaser(this);
    }
    else if (this.steps == common.DECAY_LASER) {
        this.origin.removeLaser();
    }
};

module.exports = Laser;