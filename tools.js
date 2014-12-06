"use strict";

exports.getIp = function(socket) {
    return socket.request.connection.remoteAddress;
};

exports.randInt = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};