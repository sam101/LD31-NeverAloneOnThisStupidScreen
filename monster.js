"use strict";
var common = require('./common');
var tools = require('./tools');

var id = 0;

function Monster(world) {
    this.data = {};
    this.data.id = this.id = id++;
    this.data.sprite = 0;
    this.world = world;

    this.canFire = true;
    this.missilesFired = 0;

    this.generateInitialPosition();
    this.direction = this.generateDirection();
}

Monster.prototype.generateInitialPosition = function() {
    do {
        var x = tools.randInt(0, this.world.width);
        var y = tools.randInt(0, this.world.height);
    } while (! this.world.isTileAvailable(x, y));
    this.world.addMonster(this, x, y);
};

Monster.prototype.step = function() {
    if (tools.randInt(0, 100) <= common.MONSTER_DIRECTION_CHANGE_PROBABILITY) {
        this.direction = this.generateDirection();
    }
    var newX = this.data.x, newY = this.data.y;
    switch (this.direction) {
        case common.DIRECTIONS.LEFT:
            newX = this.data.x - 1;
        break;
        case common.DIRECTIONS.RIGHT:
            newX = this.data.x + 1;
        break;
        case common.DIRECTIONS.TOP:
            newY = this.data.y - 1;
        break;
        case common.DIRECTIONS.BOTTOM:
            newY = this.data.y + 1;
        break;
    }
    if (! this.move(newX, newY)) {
        this.generateDirection();
        this.step();
    }
};

Monster.prototype.generateDirection  = function() {
    return tools.randInt(0, common.DIRECTIONS.MAX);
};

Monster.prototype.move = function(x,y) {
    if (this.world.isTileAvailable(x, y)) {
        this.world.entities[this.data.y][this.data.x] = undefined;
        this.data.x = x;
        this.data.y = y;
        this.world.entities[this.data.y][this.data.x] = this;
        return true;
    }
    return false;
};


Monster.prototype.shoot = function() {
    this.missilesFired = 4;
    this.canFire = false;
}

Monster.prototype.removeShoot = function() {
    this.missilesFired--;
    if (this.missilesFired == 0) {
        this.canFire = true;
    }
};


module.exports = Monster;