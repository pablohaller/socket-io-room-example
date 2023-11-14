import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
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

  socket.on("vote", ({ roomId, vote, activityId }) => {
    socket.to(roomId).emit("vote", { vote, activityId });
  });

  socket.on("set_activity", ({ roomId, activityId }) => {
    socket.to(roomId).emit("activity_set", activityId);
  });
});

httpServer.listen(3000, () => {
  console.log("Server listening on port 3000");
});
