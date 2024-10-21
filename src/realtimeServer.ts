import { Server } from "socket.io";

const realtimeServer = (httpServer: any) => {
  const io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log("New connection", socket.id);
  });
};

export default realtimeServer;
