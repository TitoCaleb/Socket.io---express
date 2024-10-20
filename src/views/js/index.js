const socket = io();

const send = document.getElementById("send");
const disconnect = document.getElementById("disconnect");
const reconnect = document.getElementById("reconnect");

send.addEventListener("click", () => {
  if (socket.connected) {
    socket.emit("message", "¡Esta conectado!");
  }
});

disconnect.addEventListener("click", () => {
  alert("Desconectado");
  socket.disconnect();
});

reconnect.addEventListener("click", () => {
  alert("Re-conectado");
  socket.connect();
});
