"use strict";
var tools = require('./tools');
var World = require('./world');

var worlds = [new World(0)];

var worldsForSocket = {};

function findAvailableWorld(socket) {
    for (var i = 0; i < worlds.length; i++) {
        if (! worlds[i].isFull()) {
            return worlds[i];
        }
    }
    worlds.push(new World[worlds.length]);
    return worlds[worlds.length - 1];
}

function addPlayerToWorld(socket, gameid, callback) {
    var world = findAvailableWorld(socket);
    console.log("Add player " + gameid + " to world " + world.id + "( " + world.size + " players)");
    worldsForSocket[socket] = world;
    world.addPlayer(socket, gameid, callback);
}

function handleNewPlayer(socket) {
    socket.on('login', function(gameid) {
        addPlayerToWorld(socket, gameid, function(err) {
            var world = worldsForSocket[socket];
            var player = world.getPlayer(socket);
            socket.on('move', function(x, y) {
                world.movePlayer(player, x, y);
            });

        });
    })

}

exports.use = function(io) {
    io.sockets.on('connection', handleNewPlayer);
};