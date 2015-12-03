var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));
app.get('/', function(req, res){
	res.sendFile(__dirname + "/views/index.html");
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function(socket){
		console.log('user disconnected');
	});
});
http.listen(3000, function(){
	console.log("starting this massive server on 3000");
});