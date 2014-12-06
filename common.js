"use strict";
module.exports = {
    WIDTH:40,
    HEIGHT: 22,
    STEP_INTERVAL: 200,
    PLAYERS_PER_WORLD: 6,
    MONSTER_PER_PLAYERS: 5,
    MONSTER_APPARITION_PROBABILITY: 30,
    FILL_PROBABILITY: 26,
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