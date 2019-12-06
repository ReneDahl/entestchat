var express = require("express"); // is a function
var socket = require("socket.io");

//seting up the app, we are requeing the function now
var app = express();

//createing server

//then the server is listning, we fire a call back function.
var server = app.listen(process.env.PORT || 4000, function() {
  console.log("server is running");
});

//we use middleware to serve the stadic files.

app.use("/", express.static("public"));

//Setting socket io up, we are invoking a function
var io = socket(server);
//Looking for an opening in the connection
io.on("connection", function(socket) {
  console.log("Initilizing socket connection", socket.id);

  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});
