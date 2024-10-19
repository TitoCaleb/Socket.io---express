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

const teachers = io.of("/teachers");
const students = io.of("/students");

teachers.on("connection", (socket) => {
  console.log("Teacher connected", socket.id);

  socket.on("send_message", (data) => {
    teachers.emit("message", data);
  });
});

students.on("connection", (socket) => {
  console.log("Student connected", socket.id);
  socket.on("send_message", (data) => {
    students.emit("message", data);
  });
});

httpServer.listen(3000);
