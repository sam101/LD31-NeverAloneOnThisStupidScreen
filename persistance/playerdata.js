"use strict";
var mongoose = require('mongoose');

var playerDataSchema = mongoose.Schema({
    name: String,
    level: Number
});

module.exports = mongoose.model('PlayerData', playerDataSchema);