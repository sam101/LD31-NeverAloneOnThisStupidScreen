"use strict";
var common = require('./common');
var tools = require('./tools');
var Tile = require('./Tile');

function WorldGenerator(width, height) {
    this.width = width;
    this.height = height;

    this.firstStage();

    for (var i = 0; i < common.GENERATIONS; i++) {
        this.step();
    }
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
}

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
}

WorldGenerator.prototype.step = function() {
    this.tileChanged = 0;
    for (var i = 1; i < this.height - 1; i++) {
        for (var j = 1; j < this.width - 1; j++) {
            this.changeTileStateIfNeeded(j, i);
        }
    }
    console.log(this.tileChanged + " tiles changed during this generation");
}

exports.generate = function(width, height) {
    var generator = new WorldGenerator(width, height);
    return generator.tiles;
};