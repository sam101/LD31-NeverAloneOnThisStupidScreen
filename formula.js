"use strict";

exports.expForLevel = function(level) {
    return 10 + Math.pow(level, 3);
}

exports.hpForLevel = function(level) {
    return 75 + level * 25;
}