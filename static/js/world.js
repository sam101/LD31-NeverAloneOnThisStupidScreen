"use strict";
var world;

function World(initialData) {
    PIXI.DisplayObjectContainer.call(this);

    this.tiles = new Tiles(initialData.tiles);
    this.addChild(this.tiles);

    this.player = new Player(initialData.player);
    this.addChild(this.player);

    this.lasers = {};

    this.players = {};

    var players = initialData.players;
    for (var i = 0; i < players.length; i++) {
        var player = players[i];
        this.players[player.name] = new Other(player);
        this.addChild(this.players[player.name]);
    }

    this.monsters = {};
    var monsters = initialData.monsters;


    for (var i = 0; i < monsters.length; i++) {
        var monster = monsters[i];
        this.monsters[monster.id] = new Monster(monster);
        this.addChild(this.monsters[monster.id]);
    }

    this.lifebar = new LifeBar(this.player);
    this.addChild(this.lifebar);

    this.expbar = new ExpBar(this.player);
    this.addChild(this.expbar);

    this.score = new Score(this.player.data);
    this.addChild(this.score);
}

World.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

World.prototype.updateData = function(data) {
    this.player.update(data);
    this.lifebar.update(data.hp, data.hpMax);
    this.expbar.update(data.level, data.exp, data.expToNextLevel);
    this.score.update(data);
};

World.prototype.updatePlayerData = function(playerData) {
    if (this.players.hasOwnProperty(playerData.name)) {
        this.players[playerData.name].update(playerData);
    }
    else {
        this.players[playerData.name] = new Other(playerData);
        this.addChild(this.players[playerData.name]);
    }
};

World.prototype.removePlayer = function(name) {
    if (this.players.hasOwnProperty(name)) {
        this.removeChild(this.players[name]);
        delete this.players[name];
    }
};

World.prototype.updateMonster = function(monsterData) {
    if (this.monsters.hasOwnProperty(monsterData.id)) {
        var monster = this.monsters[monsterData.id];
        monster.update(monsterData);
    }
    else {
        this.monsters[monsterData.id] = new Monster(monsterData);
        this.addChild(this.monsters[monsterData.id]);
    }
};

World.prototype.removeMonster = function(monsterData) {
    if (this.monsters.hasOwnProperty(monsterData.id)) {
        sounds.MONSTER_DEAD.play();
        this.removeChild(this.monsters[monsterData.id]);
        delete this.monsters[monsterData.id];
    }
};

World.prototype.isAvailable = function(x, y) {
    if (! this.tiles.tiles[y][x].passable) {
        return false;
    }
    for (var key in this.players) {
        var player = this.players[key];
        if (player.data.x == x && player.data.y == y) {
            return false;
        }
    }
    for (var key in this.monsters) {
        var monster = this.monsters[key];
        if (monster.data.x == x && monster.data.y == y) {
            return false;
        }
    }

    return true;
};

World.prototype.addLaser = function(data) {
    sounds.LASER_SHOT.play();
    var laser = new Laser(data);
    this.lasers[data.id] = laser;
    this.addChild(laser);
};

World.prototype.removeLaser = function(laser) {
    this.removeChild(laser);
    delete this.lasers[laser.data.id];
}

World.prototype.frame = function(n) {
    if (n % 4 == 0) {
        this.player.frame();
    }

    if (n % 5 == 0) {
        for (var key in this.lasers) {
            this.lasers[key].frame();
        }
    }
}
