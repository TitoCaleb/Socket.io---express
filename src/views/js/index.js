const socket = io({
  auth: {
    token: "valdaadsid",
  },
});

// En caso de error
socket.on("connect_error", (error) => {
  console.log("ERROR: no te conectaste");
  console.error(error.message);
});
