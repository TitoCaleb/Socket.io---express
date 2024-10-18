import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

interface SocketPersonalized extends Socket {
  connectedRoom: string;
}

io.on("connection", (socket: Socket) => {
  const personalizedSocket = socket as SocketPersonalized;
  personalizedSocket.connectedRoom = "";

  socket.on("connect_to_room", ({ room }) => {
    socket.leave(personalizedSocket.connectedRoom);

    switch (room) {
      case "room1":
        socket.join("room1");
        personalizedSocket.connectedRoom = "room1";
        break;
      case "room2":
        socket.join("room2");
        personalizedSocket.connectedRoom = "room2";

        break;
      case "room3":
        socket.join("room3");
        personalizedSocket.connectedRoom = "room3";
        break;
      default:
        break;
    }
  });

  socket.on("message", (message) => {
    const room = personalizedSocket.connectedRoom;

    io.to(room).emit("send_message", {
      message,
      room,
    });
  });
});

httpServer.listen(3000);
