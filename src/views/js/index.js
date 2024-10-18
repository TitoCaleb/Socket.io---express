const socket = io();

socket.on("welcome_message", (data) => {
  document.getElementById("text").innerText = data;
});

const emitToServer = document.querySelector("#emit-to-server");
emitToServer.addEventListener("click", () => {
  socket.emit("client_message", "¡Hola, servidor! 😎");
});

const emitToLast = document.querySelector("#emit-to-last");
emitToLast.addEventListener("click", () => {
  socket.emit("message_to_last", "¡Hola, has entrado al ultimo! 😎");
});

socket.on("send_message_to_last", (data) => {
  console.log(data);
});

socket.on("everyone", (data) => {
  console.log(data);
});

socket.on("on", () => {
  console.log("[ON] Evento que se emite varias veces");
});

socket.once("once", () => {
  console.log("[ONCE] Evento que se emite una sola vez");
});

//? Eventos de estado que se pueden escuchar
// function checkSocketStatus() {
//     console.log("Estado del socket:", socket.connected);
//   }
// socket.on("connect", () => {
//   console.log("Connected to server", socket.id);
//   checkSocketStatus();
// });

// socket.on("disconnect", () => {
//   console.log("Disconnected from server", socket.id);
//   checkSocketStatus();
// });

// socket.on("reconnect_attempt", (att) => {
//   console.log("Intentando reconectar... 🙁");
// });

// socket.on("reconnect", (att) => {
//   console.log("!Me he vuelto a conectar! 😌");
// });
