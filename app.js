"use strict";
var game = require('./game');

var argv = require('optimist').argv;
var express =require('express');
var serveStatic = require('serve-static');

var env = argv.env || 'production';

var app = express();
app.set('view engine', 'jade');
app.locals.pretty = true

var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {
    res.render('index', {env: env});
});

app.use(serveStatic('static'));

app.use('*', function(req, res) {
    res.status(404).send('404 not found');
});

game.use(io);

http.listen(argv.port || 8080);

