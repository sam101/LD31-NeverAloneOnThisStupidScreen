"use strict";

exports.getIp = function(socket) {
    return socket.request.connection.remoteAddress;
};
