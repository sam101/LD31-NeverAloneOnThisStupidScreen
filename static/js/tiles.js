"use strict";
function Tiles(data) {
    PIXI.DisplayObjectContainer.call(this);

    this.tilesHeight = data.length;
    this.tilesWidth = data[0].length;

    this.tiles = data;

    this.generateTiles();
}

Tiles.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Tiles.prototype.addTile = function(x, y, tile) {
    var tileData = common.tiles[tile.type];
    var tile = new PIXI.Sprite(tileData.texture);
    tile.position.x = x * common.TILE_SIZE;
    tile.position.y = y * common.TILE_SIZE;

    this.addChild(tile, x * common.TILE_SIZE, y * common.TILE_SIZE);
}

Tiles.prototype.generateTiles = function() {
    for (var i = 0; i < this.tilesHeight; i++) {
        for (var j = 0; j < this.tilesWidth; j++) {
            this.addTile(j, i, this.tiles[i][j]);
        }
    }
}