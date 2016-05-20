var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));
app.get('/', function(req, res){
	res.sendFile(__dirname + "/views/index.html");
});
var msgList = [];
io.on('connection', function(socket){
	msgList = msgList.reverse();
	msgList = msgList.slice(0, 9);
	msgList = msgList.reverse();
	msgList.forEach(function(m) {
		socket.emit('chat message', m);
	});
	
	console.log('a user connected');
	socket.on('chat message', function(msg){
		if (msg.length <= 0){
			socket.emit('chat message', "message cannot contain nothing");
		} else {
			console.log('message: ' + msg);
			io.emit('chat message', msg);
			msgList.push(msg);
		}

	});
	socket.on('disconnect', function(socket){
		console.log('user disconnected');
	});
});
http.listen(3000, function(){
	console.log("starting this massive server on 3000");
});