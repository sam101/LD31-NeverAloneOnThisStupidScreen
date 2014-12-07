"use strict";
var common = require('./common');
var tools = require('./tools');
var worldGenerator = require('./worldGenerator');

var Laser = require('./laser');
var Monster = require('./monster');
var Player = require('./player');

function World(id) {
    this.id = id;
    this.width = common.WIDTH;
    this.height = common.HEIGHT;
    this.size = 0;
    this.players = {};
    this.playersBySocket = {};

    this.monsters = {};
    this.monstersInWorld = 0;

    this.lasers = {};

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

World.prototype.collidesWithPlayer = function(x, y) {
    if (this.entities[y][x] == undefined) {
        return false;
    }
    var entity = this.entities[y][x];
    if (entity.isPlayer) {
        return true;
    }
    return false;
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
    this.entities = this.generateEntitiesTab();
    this.monsters = {};
    this.monstersInWorld = 0;
    this.lasers = {};
    this.tiles = worldGenerator.generate(this.width, this.height);

    for (var i = 0; i < common.INITIAL_MONSTERS; i++) {
        this.generateMonster();
    }

    console.log("World has been generated.");

};

World.prototype.addPlayer = function(socket, name, callback) {
    if (this.size <= 0) {
        this.size = 0;
        this.generate();
    }
    this.size++;

    var player = new Player(socket, name, this);
    var self = this;
    player.load(function() {
        self.players[socket.id] = player;

        self.sendDataToPlayer(player);
        self.sendPlayerDataToPlayers(player);
        callback();
    });

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



World.prototype.removePlayer = function(player, callback) {
    console.log("Removing " + player.name);
    this.size--;
    this.entities[player.data.y][player.data.x] = undefined;

    player.inWorld = false;

    delete this.players[player.socket.id];

    for (var key in this.players) {
        this.players[key].socket.emit('removePlayer', player.name);
    }

    player.save();

};

World.prototype.killPlayer = function(player) {
    player.socket.emit('death');
    this.removePlayer(player);
}

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
    if (n % 2 == 0) {
        for (var key in this.monsters) {
            var monster = this.monsters[key];
            monster.step();
            if (! monster.dead) {
                this.sendMonsterData(monster);
            }
        }
    }

    for (var key in this.lasers) {
        this.lasers[key].step();
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
    var level = this.generateMonsterLevel();
    var monster = new Monster(this, level);
    this.monsters[monster.id] = monster;
    console.log("Generated a new monster with id " + monster.id);
    this.monstersInWorld++;
};

World.prototype.generateMonsterLevel = function() {
    var minLevel = this.size;
    var maxLevel = 0;
    for (var key in this.players) {
        maxLevel += this.players[key].data.level;
    }

    if (minLevel < 1) {
        minLevel = 1;
    }


    var level = tools.randInt(minLevel, maxLevel + 1);
    return Math.floor(level / Math.max(this.size, 1));
};

World.prototype.addMonster = function(monster, x, y) {
    if (!this.isTileAvailable(x,y)) {
        console.log("Tried to add a monster at " + x + "," + y + " which is occupied.");
        return;
    }

    monster.data.x = x;;
    monster.data.y = y;

    this.entities[y][x] = monster;

    this.sendMonsterData(monster);
};

World.prototype.removeMonster = function(monster) {
    this.entities[monster.data.y][monster.data.x] = undefined;

    monster.dead = true;

    this.monstersInWorld--;
    delete this.monsters[monster.data.id];

    for (var key in this.players) {
        this.players[key].socket.emit('removeMonster', monster.data);
    }
};

World.prototype.sendMonsterData = function(monster) {
    for (var key in this.players) {
        this.players[key].socket.emit('monsterData', monster.data);
    }
};

World.prototype.shoot = function(origin) {
    if (!origin.canFire) {
        return;
    }
    origin.shoot();

    this.addLaser(origin, origin.data.x - 1, origin.data.y, common.DIRECTIONS.LEFT);
    this.addLaser(origin, origin.data.x + 1, origin.data.y, common.DIRECTIONS.RIGHT);
    this.addLaser(origin, origin.data.x, origin.data.y - 1, common.DIRECTIONS.TOP);
    this.addLaser(origin, origin.data.x, origin.data.y + 1, common.DIRECTIONS.BOTTOM);

};

World.prototype.addLaser = function(origin, x, y, direction) {
    if (this.isTileAvailable(x, y)) {
        var laser = new Laser(this, origin, x, y, direction);
        this.lasers[laser.data.id] = laser;
        this.sendLaserData(laser);
    }
    else {
        origin.removeLaser();
    }
};

World.prototype.removeLaser = function(laser) {
    delete this.lasers[laser.data.id];
};

World.prototype.shootEntity = function(laser) {
    var entity = this.entities[laser.data.y][laser.data.x];
    entity.shotWith(laser);
}

World.prototype.sendLaserData = function(laser) {
    for (var key in this.players) {
        this.players[key].socket.emit('laserData', laser.data);
    }
};


module.exports = World;
