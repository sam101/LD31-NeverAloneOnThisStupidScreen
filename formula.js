"use strict";

exports.expForLevel = function(level) {
    return 10 + Math.pow(level, 3);
};

exports.expForMonsterKilling = function(level) {
    return 2 * level;
};

exports.hpForLevel = function(level) {
    return 75 + level * 25;
};

exports.hpForMonster = function(level) {
    return 10 + (level - 1) * 10;
};

exports.attackForLevel = function(level) {
    return level * 10;
};