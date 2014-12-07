"use strict";
module.exports = {
    WIDTH:40,
    HEIGHT: 22,
    STEP_INTERVAL: 100,
    PLAYERS_PER_WORLD: 6,
    MONSTER_PER_PLAYERS: 5,
    INITIAL_MONSTERS:4,
    MONSTER_APPARITION_PROBABILITY: 30,
    FILL_PROBABILITY: 28,
    DIRECTIONS: {
        TOP:0,
        BOTTOM:1,
        LEFT:2,
        RIGHT:3,
        MAX:4
    },
    MONSTER_DIRECTION_CHANGE_PROBABILITY: 25,
    GENERATIONS: 6,
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