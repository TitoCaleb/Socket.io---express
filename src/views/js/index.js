const socket = io();
const circle = document.getElementById("circle");

document.addEventListener("mousedown", (e) => {
  document.addEventListener("mousemove", drag);
});

document.addEventListener("mouseup", () => {
  document.removeEventListener("mousemove", drag);
});

const drawCircle = (position) => {
  circle.style.top = position.top;
  circle.style.left = position.left;
};

const drag = (e) => {
  const position = {
    top: `${e.clientY}px`,
    left: `${e.clientX}px`,
  };

  drawCircle(position);
  socket.emit("circle_position", position);

  /* circle.style.top = `${clientY}px`;
  circle.style.left = `${clientX}px`; */
};

socket.on("move_circle", (position) => {
  drawCircle(position);
});
