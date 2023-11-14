import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");

  socket.on("join_room", ({ roomId, name }) => {
    console.log(
      name.toLowerCase() === "host" ? "Room created" : "Joined room!",
      socket.id,
      roomId
    );
    socket.join(roomId);
    socket
      .to(roomId)
      .emit("joined_room", { type: "join", id: socket.id, name });
  });

  socket.on("vote", ({ roomId, vote }) => {
    socket.to(roomId).emit("vote", { vote });
  });

  socket.on("new_activity", ({ roomId, activityId, text }) => {
    socket.to(roomId).emit("new_activity", { activityId, text });
  });
});

httpServer.listen(3000, () => {
  console.log("Server listening on port 3000");
});
