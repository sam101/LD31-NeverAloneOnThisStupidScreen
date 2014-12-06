"use strict";

function World(initialData) {
    PIXI.DisplayObjectContainer.call(this);

    this.tiles = new Tiles(initialData.tiles);
    this.addChild(this.tiles);

    this.player = new Player(initialData.player);
    this.addChild(this.player);

}

World.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

var world;