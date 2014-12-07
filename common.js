"use strict";
module.exports = {
    WIDTH:40,
    HEIGHT: 22,
    GENERATIONS: 6,
    FILL_PROBABILITY: 28,
    STEP_INTERVAL: 100,
    PLAYERS_PER_WORLD: 6,
    MONSTER_PER_PLAYERS: 5,
    INITIAL_MONSTERS:4,
    MONSTER_APPARITION_PROBABILITY: 30,
    PLAYER_SPRITES: 4,
    MONSTER_SPRITES: 5,
    DIRECTIONS: {
        TOP:0,
        BOTTOM:1,
        LEFT:2,
        RIGHT:3,
        MAX:4
    },
    MONSTER_DIRECTION_CHANGE_PROBABILITY: 25,
    MONSTER_FIRE_PROBABILITY: 10,
    TILES: {
        EMPTY: 0,
        WALL: 1
    },
    TILES_DATA: {
        0: {
            passable:true

        },
        1 : {
            passable:false
        }
    }

}