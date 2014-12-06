"use strict";
var argv = require('optimist').argv;
var express =require('express');

var app = express();
app.set('view engine', 'jade');

var http = require('http').Server(app);

var io = require('socket.io')(http);

var env = argv.env || 'production';

app.get('/', function(req, res) {
    res.render('index', {env: env});
});


app.use('*', function(req, res) {
    res.send('404 not found', 404);
});

http.listen(argv.port || 8080);

