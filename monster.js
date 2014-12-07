"use strict";
var common = require('./common');
var formula = require('./formula');
var tools = require('./tools');

var id = 0;

function Monster(world, level) {
    this.data = {};
    this.data.id = this.id = id++;
    this.data.level = level;
    this.data.sprite = this.data.level % common.MONSTER_SPRITES;
    this.data.hp = formula.hpForMonster(this.data.level);
    this.data.hpMax = formula.hpForMonster(this.data.level);

    this.world = world;

    this.dead = false;

    this.canFire = true;
    this.missilesFired = 0;

    this.expGivenOnDeath = formula.expForMonsterKilling(this.data.level);

    this.generateInitialPosition();
    this.direction = this.generateDirection();
}
Monster.prototype.addExp = function(expToAdd) {
    // Do nothing, monsters do not gain exp (for now)
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
    if (tools.randInt(0, 100) <= common.MONSTER_FIRE_PROBABILITY) {
        this.world.shoot(this);
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

Monster.prototype.shotWith = function(laser) {
    this.data.hp -= laser.data.attack;
    console.log("Monster " + this.id + " shot : ", this.data.hp + "/" + this.data.hpMax);
    if (this.data.hp <= 0) {
        this.world.removeMonster(this);
        laser.origin.addExp(this.expGivenOnDeath);
    }
};

Monster.prototype.move = function(x,y) {
    if (this.world.isTileAvailable(x, y)) {
        this.world.entities[this.data.y][this.data.x] = undefined;
        this.data.x = x;
        this.data.y = y;
        this.world.entities[this.data.y][this.data.x] = this;
        return true;
    }
    else if (this.world.collidesWithPlayer(x,y)) {
        var damage = {
            origin: this,
            data: {
                attack: formula.collisionDamageForMonster(this.data.level)
            }
        };
        this.world.entities[y][x].shotWith(damage);
        this.world.removeMonster(this);
        return true;
    }
    return false;
};


Monster.prototype.shoot = function() {
    this.missilesFired = 4;
    this.canFire = false;
}

Monster.prototype.removeLaser = function() {
    this.missilesFired--;
    if (this.missilesFired == 0) {
        this.canFire = true;
    }
};


module.exports = Monster;