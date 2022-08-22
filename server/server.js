const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const TEXTAREA_MESSAGE_EVENT = "textareaMessage";

io.on("connection", (socket) => {
  console.log("Initialization of server");
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on(TEXTAREA_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(TEXTAREA_MESSAGE_EVENT, data)
  })

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    console.log("disconnect");
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
