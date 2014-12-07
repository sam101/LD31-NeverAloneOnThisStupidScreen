"use strict";
var common = {
    RENDER_WIDTH: 1280,
    RENDER_HEIGHT: 720,
    FRAME_TIME: 20,
    TILE_SIZE: 32
};

common.directions = {
    TOP:0,
    BOTTOM:1,
    LEFT:2,
    RIGHT:3,
    MAX:4
};

common.laser = PIXI.Texture.fromImage("res/laser.png");

common.emptyBar = PIXI.Texture.fromImage("res/emptybar.png");
common.lifeBar = PIXI.Texture.fromImage("res/lifebar.png");
common.expBar = PIXI.Texture.fromImage("res/expbar.png");

common.sprites = {
    0: {
        texture: PIXI.Texture.fromImage("res/player0.png")
    }
};


common.monsterSprites = {
    0: {
        texture: PIXI.Texture.fromImage("res/monster0.png")
    }
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