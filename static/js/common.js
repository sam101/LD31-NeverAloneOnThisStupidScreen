"use strict";
var common = {
    RENDER_WIDTH: 1280,
    RENDER_HEIGHT: 720,
    TILE_SIZE: 32
};


common.sprites = {
    0: {
        texture: PIXI.Texture.fromImage("res/player0.png")
    }
};


common.monsterSprites = {

};

common.tiles = {
    0: {
        texture: PIXI.Texture.fromImage("res/empty.png"),
        passable: true
    },
    1: {
        texture: PIXI.Texture.fromImage("res/wall.png"),
        passable: false
    }
};