"use strict";
var tools = require('./tools');
var World = require('./world');

var worlds = [new World(0)];

function findAvailableWorld(socket) {
    for (var i = 0; i < worlds.length; i++) {
        if (! worlds[i].isFull()) {
            return worlds[i];
        }
    }
    worlds.push(new World[worlds.length]);
    return worlds[worlds.length - 1];
}

function addPlayerToWorld(socket, callback) {
    var world = findAvailableWorld(socket);
    world.addPlayer(socket);
    console.log("Add player " + socket.id + " to world " + world.id + "( " + world.size + " players)");
}

function handleNewPlayer(socket) {
    console.log("Got a new request from " + socket.id + "(" + tools.getIp(socket) + ")");
    addPlayerToWorld(socket, function() {

    });

}

exports.use = function(io) {
    io.sockets.on('connection', handleNewPlayer);
};