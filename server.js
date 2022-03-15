// declare express variables and open on port 3000
const express = require("express");
const app = express();
const server = app.listen(3000);

// declare socket.io variables
const socket = require("socket.io");
const io = socket(server);

// host client files
app.use(express.static("public"));

// connect to socket.io server 
io.sockets.on('connection', socket => {
  socket.on('message', data => {
    socket.broadcast.emit('message', data);
  });
});
