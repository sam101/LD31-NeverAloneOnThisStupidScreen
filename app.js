"use strict";
var argv = require('optimist').argv;
var express =require('express');

var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

http.listen(argv.port || 8080);