import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id);

      if (!user) return next(new Error("Unauthorized"));

      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user._id);

    // 🔥 tournament roomga join
    socket.on("joinTournamentRoom", (tournamentId) => {
      socket.join(tournamentId);
      console.log(`User joined room ${tournamentId}`);
    });

    socket.on("leaveTournamentRoom", (tournamentId) => {
      socket.leave(tournamentId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
