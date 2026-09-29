import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chat.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());

// ✅ CORS middleware FIRST
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

// ✅ Health check endpoint (before routes)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.use("/api/v1", chatRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ✅ Non-blocking database connection
connectDB().catch((err) => {
  console.error("Database connection failed:", err);
});

const userSocketMap: Record<string, string> = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  const userId = socket.handshake.query.userId as string | undefined;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} mapped to socket ${socket.id}`);
  }

  io.emit("getOnlineUser", Object.keys(userSocketMap));

  if (userId) {
    socket.join(userId);
  }

  socket.on("joinChat", (chatId) => {
    if (!chatId) return;
    socket.join(chatId.toString());
    console.log(`User ${userId} joined chat room ${chatId}`);
  });

  socket.on("leaveChat", (chatId) => {
    if (!chatId) return;
    socket.leave(chatId.toString());
    console.log(`User ${userId} left chat room ${chatId}`);
  });

  socket.on("typing", (data) => {
    if (!data?.chatId) return;
    socket.to(data.chatId.toString()).emit("userTyping", {
      chatId: data.chatId,
      userId: data.userId,
    });
  });

  socket.on("stopTyping", (data) => {
    if (!data?.chatId) return;
    socket.to(data.chatId.toString()).emit("userStoppedTyping", {
      chatId: data.chatId,
      userId: data.userId,
    });
  });

  socket.on("newMessage", (data) => {
    if (!data?.chatId) return;
    io.to(data.chatId.toString()).emit("receiveMessage", {
      chatId: data.chatId,
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUser", Object.keys(userSocketMap));
    }
  });
});

// ✅ Server listen LAST
const port = Number(process.env.PORT) || 5002;

server.listen(port, "0.0.0.0", () => {
  console.log(`✓ Server running on 0.0.0.0:${port}`);
});

export { app, server, io };
