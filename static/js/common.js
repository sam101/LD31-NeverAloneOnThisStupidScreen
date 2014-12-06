"use strict";
var common = {
    RENDER_WIDTH: 1280,
    RENDER_HEIGHT: 720,
    TILE_SIZE: 32
};

common.tiles = {
    0: {
        file: "res/empty.png",
        texture: PIXI.Texture.fromImage("res/empty.png"),
        passable: false
    }
};