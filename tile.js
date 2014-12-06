"use strict";
var common = require('./common');
function Tile(type) {
    this.type = type;
    this.passable = common.TILES_DATA[type].passable;
}


module.exports = Tile;