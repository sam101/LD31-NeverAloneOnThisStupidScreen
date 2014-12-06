"use strict";
var argv = require('optimist').argv;
var express =require('express');
var serveStatic = require('serve-static');

var app = express();
app.set('view engine', 'jade');
app.locals.pretty = true

var http = require('http').Server(app);

var io = require('socket.io')(http);

var env = argv.env || 'production';

app.get('/', function(req, res) {
    res.render('index', {env: env});
});

app.use(serveStatic('static'));

app.use('*', function(req, res) {
    res.status(404).send('404 not found');
});

http.listen(argv.port || 8080);

