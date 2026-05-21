import { Socket, Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userSocketMap: Record<string, string> = {};

export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket: Socket) => {
  console.log("User connected:", socket.id);
  const userId = socket.handshake.query.userId as string | undefined;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} mapped to socket ${socket.id}`);
  }

  // Broadcast current online user list
  io.emit("getOnlineUser", Object.keys(userSocketMap));

  if (userId) {
    socket.join(userId);
  }

  // Room interaction
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

  // Typing States
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

  // Fixed: Accepts the single object matching your frontend structure
  socket.on("newMessage", (data) => {
    if (!data?.chatId) return;
    io.to(data.chatId.toString()).emit("receiveMessage", {
      chatId: data.chatId,
      message: data.message,
    });
  });

  // Fixed: Clean up user records ONLY when they actually disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId];
      console.log(`User ${userId} removed from online users`);
      io.emit("getOnlineUser", Object.keys(userSocketMap));
    }
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });
});

export { app, server, io };
