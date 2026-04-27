import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { createClient } from "redis";
import UserRoutes from "./routes/user.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
dotenv.config();
connectDB();
connectRabbitMQ();
export const redisClient = createClient({
    url: process.env.REDIS_URL,
});
redisClient
    .connect()
    .then(() => console.log("Connected to redis"))
    .catch(console.error);
const app = express();
app.use("/api/v1", UserRoutes);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
