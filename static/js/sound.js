"use strict";
var sounds = {};

sounds.MUSIC = new buzz.sound("sounds/first", {
    formats: ["mp3"],
    loop: true,
    volume: 50
});

sounds.GAME_OVER = new buzz.sound("sounds/gameOver", {
    formats: ["mp3"],
    volume: 50
});

sounds.LEVEL_UP = new buzz.sound("sounds/levelUp", {
    formats: ["wav"]
});

sounds.HIT = new buzz.sound("sounds/hit", {
    formats: ["wav"]
});

sounds.LASER_SHOT = new buzz.sound("sounds/laserShot", {
    formats: ["wav"]
});


sounds.MONSTER_DEAD = new buzz.sound("sounds/monsterDead", {
    formats: ["wav"]
});

sounds.SHOOT = new buzz.sound("sounds/shoot", {
    formats: ["wav"]
});


buzz.all().load();