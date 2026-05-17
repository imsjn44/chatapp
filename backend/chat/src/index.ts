import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chat.js";
import cors from "cors";
import { app, server } from "./config/socket.js";
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/v1", chatRoutes);

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
