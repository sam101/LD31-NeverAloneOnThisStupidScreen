"use strict";

var adjectives = require('./data/adjectives.json');
var animals = require('./data/animals.json');
var colors = require('./data/colors.json');

var tools = require('./tools');

exports.check = function(username) {
    var result = username.match(/([A-Z]|[0-9])([a-z])+/g);
    if (result == null) {
        return false;
    }
    if (result.length > 2) {
        return false;
    }
    if (adjectives.indexOf(result[0]) == -1 && colors.indexOf(result[0]) == -1) {
        return false;
    }
    if (animals.indexOf(result[1]) == -1) {
        return false;
    }

    var numbers = username.match(/[0-9]+/g);
    if (numbers == null) {
        return false;
    }
    if (numbers.length > 1) {
        return false;
    }
    if (numbers[0] < 10 || numbers[0] > 99) {
        return false;
    }
    return true;
}

exports.generate = function() {
    var animal = animals[tools.randInt(0, animals.length)];
    var color = colors[tools.randInt(0, colors.length)];
    var adjective = adjectives[tools.randInt(0, adjectives.length)];

    var number = tools.randInt(10, 99);
    if (tools.randInt(0, 100) < 50) {
        return  color + animal + number;
    }
    else {
        return adjective + animal + number;
    }
}

