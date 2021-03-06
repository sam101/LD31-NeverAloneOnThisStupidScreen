"use strict";

exports.expForLevel = function(level) {
    return 5 + Math.pow(level, 3);
};

exports.expForPlayerKilling = function(level) {
    return 5 * level;
}

exports.expForMonsterKilling = function(level) {
    return 2 * level;
};

exports.hpForLevel = function(level) {
    return 50 + level * 25;
};

exports.hpForMonster = function(level) {
    return 10 + (level - 1) * 10;
};

exports.scoreForMonsterKilling = function(level) {
    return 100 * level + 50 * Math.pow(level, 2);
};

exports.scoreForPlayerKilling = function(level) {
    return 250 * level + 50 * Math.pow(level, 4);
};


exports.attackForMonsterAtLevel = function(level) {
    return level * 5;
};

exports.collisionDamageForMonster = function(level) {
    return level * 20;
};

exports.attackForLevel = function(level) {
    return level * 10;
};