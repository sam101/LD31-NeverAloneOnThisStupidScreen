"use strict";
var mongoose = require('mongoose');

var playerDataSchema = mongoose.Schema({
    name: String,
    level: Number,
    sprite: Number
});

module.exports = mongoose.model('PlayerData', playerDataSchema);