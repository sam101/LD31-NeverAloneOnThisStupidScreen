"use strict";

var adjectives = require('./data/adjectives.json');
var animals = require('./data/animals.json');
var colors = require('./data/colors.json');

var playerData = require('./persistance/playerdata');
var tools = require('./tools');

exports.check = function(username, callback) {
    playerData.findOne({name: username}, function(err, playerData) {
        if (err) {
            return callback(false);
        }
        else if (playerData == undefined) {
            return callback(false);
        }
        else {
            return callback(true);
        }
    });
}

exports.generate = function(callback) {
    var animal = animals[tools.randInt(0, animals.length)];
    var color = colors[tools.randInt(0, colors.length)];
    var adjective = adjectives[tools.randInt(0, adjectives.length)];

    var number = tools.randInt(10, 99);

    var nickname;

    if (tools.randInt(0, 100) < 50) {
        nickname =  color + animal + number;
    }
    else {
        nickname = adjective + animal + number;
    }

    var PlayerData = new playerData({
        name: nickname,
        level:1
    });

    PlayerData.save(function(err) {
        if (err) {
            return console.error(err);
        }
        else {
            callback(nickname);
        }
    });
}

