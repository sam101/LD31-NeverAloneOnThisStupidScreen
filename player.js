"use strict";
var common = require('./common');
var formula = require('./formula');
var tools = require('./tools');

var PlayerData = require('./persistance/playerdata');

function Player(socket, name, world) {
    this.name = name;
    this.socket = socket;
    this.world = world;
    this.isPlayer = true;
    this.inWorld = true;

    this.canFire = true;
    this.missilesFired = 0;

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
Player.prototype.load = function(callback) {
    var self = this;
    PlayerData.findOne({name: this.data.name}, function(err, playerData) {
        if (err || playerData == undefined) {
            self.playerData = new PlayerData({
                name: self.data.name,
                level: 1,
                sprite: tools.randInt(0, common.PLAYER_SPRITES)
            });
        }
        else {
            self.playerData = playerData;
            self.data.sprite = playerData.sprite != undefined ? playerData.sprite : tools.randInt(0, common.PLAYER_SPRITES);
            self.data.level = playerData.level;
        }
        return callback();
    });
};

Player.prototype.save = function(){
    var self = this;
    this.playerData.sprite = this.data.sprite;
    this.playerData.level = this.data.level;
    this.playerData.save(function(err) {
        if (err) {
            console.err("Saving of " + self.data.name + " failed. Too bad for him");
        }
        else {
            console.log("Saving of " + self.data.name + " ok.");
        }
    });
};


Player.prototype.addExp = function(expToAdd) {
    this.data.exp += expToAdd;
    if (this.data.exp >= this.data.expToNextLevel) {
        this.data.exp -= this.data.expToNextLevel;
        this.data.level++;
        console.log("Level up for " + this.data.name + " to " + this.data.level);
        this.data.hp = formula.hpForLevel(this.data.level);
        this.data.hpMax = formula.hpForLevel(this.data.level);
        this.data.expToNextLevel = formula.expForLevel(this.data.level);

        if (this.data.level >= 1) {
            console.log(this.data.name + " won the game !");
            this.socket.emit('winGame');
        }
    }
    this.world.sendPlayerDataToPlayers(this);
    this.socket.emit('data', this.data);
};

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

Player.prototype.shotWith = function(laser) {
    this.data.hp -= laser.data.attack;
    console.log("Player " + this.name + " shot : ", this.data.hp + "/" + this.data.hpMax);
    this.socket.emit('damageTaken');
    this.socket.emit('data', this.data);
    if (this.data.hp <= 0) {
        this.world.killPlayer(this);
        laser.origin.addExp(formula.expForPlayerKilling(this.data.level));
    }

};

Player.prototype.shoot = function() {
    this.missilesFired = 4;
    this.canFire = false;
}

Player.prototype.removeLaser = function() {
    this.missilesFired--;
    if (this.missilesFired == 0) {
        this.canFire = true;
    }
};

module.exports = Player;