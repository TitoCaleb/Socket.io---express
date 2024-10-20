const socket = io();

const circle = document.getElementById("circle");

const drawCircle = (position) => {
  circle.style.top = position.top;
  circle.style.left = position.left;
};

const drag = (e) => {
  const position = {
    top: e.clientY + "px",
    left: e.clientX + "px",
  };

  drawCircle(position);
  console.log("Se envía el evento al servidor");
  socket.volatile.emit("circle_position", position);
  // Añadir volatile para que no se envíe el evento a todos los clientes
};

document.addEventListener("mousedown", (e) => {
  document.addEventListener("mousemove", drag);
});

document.addEventListener("mouseup", (e) => {
  document.removeEventListener("mousemove", drag);
});

socket.on("move_circle", (position) => {
  drawCircle(position);
});
