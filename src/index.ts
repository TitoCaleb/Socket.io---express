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
  socketOnline.push(socket.id);

  console.log("Clientes conectados", io.engine.clientsCount);
  console.log("Id del socket conectado", socket.id);
  socket.emit("welcome_message", "Ahora estás conectado al servidor 😎.");

  socket.on("client_message", (data) => {
    console.log(data);
  });

  // Emisión a todos los clientes
  io.emit("everyone", `El client con el id ${socket.id} se ha conectado`);

  // Emisión a uno solo
  socket.on("message_to_last", (data) => {
    const lastSocket = socketOnline.at(-1);

    if (!lastSocket) {
      return;
    }

    io.to(lastSocket).emit("send_message_to_last", data);
  });

  //on, once, off
  socket.emit("on", "Buenas");
  socket.emit("on", "Buenas");

  socket.emit("once", "Buenas 2 veces");
  socket.emit("once", "Buenas 2 veces");

  socket.on("disconnect", () => {
    console.log(`El socket ${socket.id} se desconecto`);
  });
});

httpServer.listen(3000);
