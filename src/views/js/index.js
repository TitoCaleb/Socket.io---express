const socket = io();

//Botones
const connectRoom1 = document.getElementById("connectRoom1");
const connectRoom2 = document.getElementById("connectRoom2");
const connectRoom3 = document.getElementById("connectRoom3");

connectRoom1.addEventListener("click", () => {
  socket.emit("connect_to_room", { room: "room1" });
});
connectRoom2.addEventListener("click", () => {
  socket.emit("connect_to_room", { room: "room2" });
});
connectRoom3.addEventListener("click", () => {
  socket.emit("connect_to_room", { room: "room3" });
});

// Botón mensaje
const sendMessage = document.getElementById("sendMessage");

// Enviar mensaje
sendMessage.addEventListener("click", () => {
  const message = prompt("Escribe tu mensaje");

  socket.emit("message", message);
});

// Recibir mensaje
socket.on("send_message", ({ room, message }) => {
  const li = document.createElement("li");
  li.innerText = message;

  console.log(li);

  document.querySelector(`#${room}`).appendChild(li);
});
