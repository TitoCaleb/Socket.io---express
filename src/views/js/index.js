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
