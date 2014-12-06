"use strict";
var playerNameGenerator = require('./playerNameGenerator');
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

function addPlayerToWorld(socket, name, callback) {
    var world = findAvailableWorld(socket);
    console.log("Add player " + name + " to world " + world.id + "( " + world.size + " players)");
    worldsForSocket[socket] = world;
    world.addPlayer(socket, name, callback);
}

function handleNewPlayer(socket) {

    socket.on('generateName', function() {
        socket.emit('name', playerNameGenerator.generate());
    })

    socket.on('login', function(name) {
        addPlayerToWorld(socket, name, function(err) {
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