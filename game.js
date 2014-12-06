"use strict";
var common = require('./common');
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
    var newWorld = new World(worlds.length);
    worlds.push(newWorld);
    return newWorld;
}
var frame = 0;
function step() {
    for (var i = 0; i < worlds.length; i++) {
        worlds[i].step(frame);
    }
    frame++;
}

function addPlayerToWorld(socket, name, callback) {
    var world = findAvailableWorld(socket);
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
            console.log("Add player " + name + " to world " + world.id + " (" + world.size + " players)");

            var player = world.getPlayer(socket);

            socket.on('disconnect', function() {
                world.removePlayer(player);
            });

            socket.on('move', function(x, y) {
                world.movePlayer(player, x, y);
            });
        });
    })

}

setInterval(step, common.STEP_INTERVAL);

exports.use = function(io) {
    io.sockets.on('connection', handleNewPlayer);
};