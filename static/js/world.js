"use strict";
var world;

function World(initialData) {
    PIXI.DisplayObjectContainer.call(this);

    this.tiles = new Tiles(initialData.tiles);
    this.addChild(this.tiles);

    this.player = new Player(initialData.player);
    this.addChild(this.player);

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

}

World.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

World.prototype.updateData = function(data) {
    this.player.update(data);
    this.lifeBar.update(data.hp, data.hpMax);
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

World.prototype.frame = function(n) {
    if (n % 4 == 0) {
        this.player.frame();
    }
}