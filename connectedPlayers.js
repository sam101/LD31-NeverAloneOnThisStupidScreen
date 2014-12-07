"use strict";

var connectedPlayers = {};

exports.connect = function(name) {
    connectedPlayers[name] = true;
};

exports.disconnect = function(name) {
   delete connectedPlayers[name];
};

exports.isConnected = function(name) {
    return connectedPlayers[name];
};
