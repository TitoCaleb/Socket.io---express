import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (token === "valid") {
    return next();
  } else {
    return next(new Error("invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

httpServer.listen(3000);
