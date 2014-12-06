"use strict";
var common = require('./common');
var Tile = require('./Tile');
exports.generate = function(width, height) {
    var tiles = [];
    for (var i = 0; i < height; i++) {
        tiles[i] = [];
        for (var j = 0; j < width; j++) {
            tiles[i][j] = new Tile(common.TILES.EMPTY_TILE);
        }
    }
}