var io = require("socket.io");

var port = 1223 // change your port here
var host = "1.2.3.4" // change your host here
var socket = io.listen(port, host);

socket.set("log level", 1);
var people = {};

socket.on("connection", function (client) {

	client.on("join", function(name){
		people[client.id] = name;
		client.emit("update", "You have connected to the server.");
		socket.sockets.emit("update", name + " has joined the server.")
		socket.sockets.emit("update-people", people);
	});

	client.on("send", function(msg){
		socket.sockets.emit("chat", people[client.id], msg);
	});

	client.on("disconnect", function(){
		socket.sockets.emit("update", people[client.id] + " has left the server.");
		delete people[client.id];
		socket.sockets.emit("update-people", people);
	});
});
