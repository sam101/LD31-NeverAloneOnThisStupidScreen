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
        this.players[players.name] = new Other(players[i]);
        this.addChild(this.players[players.name]);
    }

}

World.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

World.prototype.isAvailable = function(x, y) {
    if (! this.tiles.tiles[y][x].passable) {
        return false;
    }
    return true;
};

World.prototype.frame = function(n) {
    if (n % 4 == 0) {
        this.player.frame();
    }
}