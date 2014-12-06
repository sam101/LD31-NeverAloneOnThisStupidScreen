function Tiles(data) {
    PIXI.DisplayObjectContainer.call(this);

    this.tilesHeight = data.length;
    this.tilesWidth = data[0].length;

    this.tiles = data;

    this.generate();
}

Tiles.prototype.generate = function() {
    
}