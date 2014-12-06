"use strict";

var adjectives = require('./data/adjectives.json');
var animals = require('./data/animals.json');
var colors = require('./data/colors.json');

var tools = require('./tools');

exports.generate = function() {
    var animal = animals[tools.randInt(0, animals.length)];
    var color = colors[tools.randInt(0, colors.length)];
    var adjective = adjectives[tools.randInt(0, adjectives.length)];

    var number = tools.randInt(10, 99);

    return adjective + color + animal + number;
}

