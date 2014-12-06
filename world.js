"use strict";
var common = require('./common');
var tools = require('./tools');
var worldGenerator = require('./worldGenerator');

var Player = require('./player');
var Monster = require('./monster');

function World(id) {
    this.id = id;
    this.width = common.WIDTH;
    this.height = common.HEIGHT;
    this.size = 0;
    this.players = {};
    this.playersBySocket = {};
    this.monsters = {};
    this.monstersInWorld = 0;
    this.entities = this.generateEntitiesTab();

    console.log("Just built a world with id " + id + "(" + this.width + "," + this.height + ")");
}

World.prototype.generateEntitiesTab = function() {
    var tiles = [];

    for (var i = 0; i < this.height; i++) {
        tiles[i] = [];
    }

    return tiles;
}

World.prototype.isFull = function() {
    return this.size >= common.PLAYERS_PER_WORLD;
};

World.prototype.isTileAvailable = function(x, y) {
    if (!this.tiles[y][x].passable) {
        return false;
    }
    if (this.entities[y][x] != undefined) {
        return false;
    }
    return true;
}

World.prototype.addPlayerToPosition = function(player, x, y) {
    if (this.entities[y][x] != undefined) {
        throw "Don't add a player to an existing position.";
    }
    this.entities[y][x] = player;
    player.move(x, y);
}

World.prototype.generate = function() {
    console.log("Currently generating the world...");
    this.tiles = worldGenerator.generate(this.width, this.height);
    console.log("World has been generated.");
};

World.prototype.addPlayer = function(socket, name, callback) {
    if (this.size == 0) {
        this.generate();
    }
    this.size++;

    var player = new Player(socket, name, this);
    this.players[socket.id] = player;

    this.sendDataToPlayer(player);
    this.sendPlayerDataToPlayers(player);
    callback();

};

World.prototype.movePlayer = function(player, x, y) {
    if (this.isTileAvailable(x, y)) {
        this.entities[player.data.y][player.data.x] = undefined;
        player.move(x,y);
        this.entities[player.data.y][player.data.x] = player;
        console.log("Player " + player.name + " has moved to " + x + "," + y);

        this.sendPlayerDataToPlayers(player);

    }
    else {
        console.log("Refused move to " + x + "," + y + " for " + player.name);
    }
}

World.prototype.removePlayer = function(player) {
    console.log("Removing " + player.name);
    this.size--;
    delete this.entities[player.data.y][player.data.x];
    delete this.players[player.socket.id];

    for (var key in this.players) {
        this.players[key].socket.emit('removePlayer', player.name);
    }

};

World.prototype.getPlayer = function(socket) {
    return this.players[socket.id];
};

World.prototype.sendPlayerDataToPlayers = function(player) {
    for (var key in this.players) {
        if (this.players[key] != player) {
            this.players[key].socket.emit('playerData', player.data);
        }
    }
};

World.prototype.sendDataToPlayer = function(player) {
    var initialData = {
        monsters: [],
        player: player.data,
        players: [],
        tiles: this.tiles
    };

    for (var key in this.players) {
        if (this.players[key] != player) {
            initialData.players.push(this.players[key].data);
        }
    }

    for (var key in this.monsters) {
            initialData.monsters.push(this.monsters[key].data);
    }


    player.socket.emit('initialData', initialData);
};

World.prototype.step = function(n) {
    if (n % 10 == 0) {
        this.checkMonsterPopulation();
    }
};

World.prototype.checkMonsterPopulation = function() {
    if (this.monstersInWorld >= common.MONSTER_PER_PLAYERS * this.size) {
        return;
    }
    if (tools.randInt(0, 100) <= common.MONSTER_APPARITION_PROBABILITY) {
        this.generateMonster();
    }
};

World.prototype.generateMonster = function() {
    var monster = new Monster(this);
    this.monsters[monster.id] = monster;
    console.log("Generated a new monster");
};

World.prototype.addMonster = function(monster, x, y) {
    if (!this.isTileAvailable(x,y)) {
        console.log("Tried to add a monster at " + x + "," + y + " which is occupied.");
        return;
    }

    this.entities[y][x] = monster;

    monster.move(x,y);

};

module.exports = World;
