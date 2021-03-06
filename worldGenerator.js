/**
  * Generate a world with a simple cellular automata.
  * This cellular automata is actually broken, since it
  * doesn't check the previous state of the current neighbor
  * cell but its current state.
  * Somehow, it still generates some cool structures so...
  */
"use strict";
var common = require('./common');
var tools = require('./tools');
var Tile = require('./tile');

function WorldGenerator(width, height) {
    this.width = width;
    this.height = height;
    do {
        console.log("Generating a world...");
        this.firstStage();

        for (var i = 0; i < common.GENERATIONS; i++) {
            this.step();
        }
    } while (! this.check());
}

WorldGenerator.prototype.generateRandomTile = function() {

    var tileNumber;

    if (tools.randInt(0, 100) < common.FILL_PROBABILITY) {
        tileNumber = common.TILES.WALL;
    }
    else {
        tileNumber = common.TILES.EMPTY;
    }

    return new Tile(tileNumber);
};

WorldGenerator.prototype.firstStage = function() {
    var tiles = [];
    for (var i = 0; i < this.height; i++) {
        tiles[i] = [];
        for (var j = 0; j < this.width; j++) {
            tiles[i][j] = this.generateRandomTile();
        }
    }

    for (var i = 0; i < this.height; i++) {
        tiles[i][0] = new Tile(common.TILES.WALL);
        tiles[i][this.width - 1] = new Tile(common.TILES.WALL);
    }

    for (var j = 0; j < this.width; j++) {
        tiles[0][j] = new Tile(common.TILES.WALL);
        tiles[this.height - 1][j] = new Tile(common.TILES.WALL);
    }


    this.tiles = tiles;
};

WorldGenerator.prototype.isWall = function(x, y) {
    return this.tiles[y][x].type == common.TILES.WALL;
}

WorldGenerator.prototype.getAdjacentWalls = function(x, y) {
    var startX = x - 1;
    var startY = y - 1;
    var endX = x + 1;
    var endY = y + 1;

    var walls = 0;

    for (var i = startY ; i <= endY; i++) {
        for (var j = startX; j <= endX; j++) {
            if (!(i == y && j == x)) {
                if (this.isWall(j,i)) {
                    walls++;
                }
            }
        }
    }

    return walls;
};

WorldGenerator.prototype.changeTileStateIfNeeded = function(x, y) {
    var adjacentWalls = this.getAdjacentWalls(x, y);
    if (this.tiles[y][x].type == common.TILES.WALL) {
        if (adjacentWalls < 2) {
            this.tileChanged++;
            this.tiles[y][x] = new Tile(common.TILES.EMPTY);
        }
    }
    else {
        if (adjacentWalls >= 5) {
            this.tileChanged++;
            this.tiles[y][x] = new Tile(common.TILES.WALL);
        }
    }
};

WorldGenerator.prototype.step = function() {
    this.tileChanged = 0;
    for (var i = 1; i < this.height - 1; i++) {
        for (var j = 1; j < this.width - 1; j++) {
            this.changeTileStateIfNeeded(j, i);
        }
    }
    console.log(this.tileChanged + " tiles changed during this generation");
};

WorldGenerator.prototype.check = function() {
    this.generateFloodTiles();
    this.generateFirstFloodTile();
    this.propagate();
    return this.isValidMap();
};

WorldGenerator.prototype.generateFloodTiles = function() {
    var tiles = [];
    for (var i = 0; i < this.height; i++) {
        tiles[i] = [];
        for (var j = 0; j < this.width; j++) {
            if (this.tiles[i][j].type == common.TILES.WALL) {
                tiles[i][j] = -1;
            }
            else {
                tiles[i][j] = 0;
            }
        }
    }
    this.floodTiles = tiles;

};

WorldGenerator.prototype.generateFirstFloodTile = function() {
    var x, y;
    do {
        x = tools.randInt(0, this.width);
        y = tools.randInt(0, this.height);
    } while (this.floodTiles[y][x] == -1);
    this.floodTiles[y][x] = 1;
};

WorldGenerator.prototype.propagate = function() {
    var tilesChanged;
    do {
        tilesChanged = 0;

        for (var i = 1; i < this.height - 1; i++) {
            for (var j = 1; j < this.width - 1; j++) {
                if (this.floodTiles[i][j] == 0) {
                    if (this.hasFloodNeighbor(j, i)) {
                        this.floodTiles[i][j] = 1;
                        tilesChanged++;
                    }
                }
            }
        }
    } while (tilesChanged != 0);
};
WorldGenerator.prototype.hasFloodNeighbor = function(x, y) {
    if (this.floodTiles[y][x - 1] == 1) {
        return true;
    }
    else if (this.floodTiles[y][x + 1] == 1) {
        return true;
    }
    else if (this.floodTiles[y - 1][x] == 1) {
        return true;
    }
    else if (this.floodTiles[y + 1][x] == 1) {
        return true;
    }
    return false;
};
WorldGenerator.prototype.isValidMap = function() {
    for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
            if (this.floodTiles[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
};

exports.generate = function(width, height) {
    var generator = new WorldGenerator(width, height);
    return generator.tiles;
};