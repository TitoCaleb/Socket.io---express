process.env.DEBUG = "socket.io:socket";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

const socketOnline: string[] = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", (socket) => {
  socket.on("circle_position", (position) => {
    socket.broadcast.emit("move_circle", position);
  });
});

httpServer.listen(3000);
