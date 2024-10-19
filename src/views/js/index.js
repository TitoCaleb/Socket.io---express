/* const socket = io(); */ //Esto conecta al namespace por defecto

const user = prompt("Enter your user");

const teachers = ["teacher1", "teacher2", "teacher3"];

let socketNamespace, group;

const namespace = document.getElementById("namespace");
const chat = document.getElementById("chat");

if (teachers.includes(user)) {
  socketNamespace = io("/teachers"); // Conecta al namespace teachers
  group = "teachers";
} else {
  socketNamespace = io("/students"); // Conecta al namespace students
  group = "students";
}

socketNamespace.on("connect", () => {
  namespace.textContent = group;
});

// Lógica para enviar mensajes

const send_message = document.getElementById("send_message");
send_message.addEventListener("click", () => {
  const message = prompt("Enter your message");

  socketNamespace.emit("send_message", { user, message });
});

socketNamespace.on("message", ({ user, message }) => {
  const li = document.createElement("li");
  li.textContent = `${user}: ${message}`;
  chat.appendChild(li);
});
