import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chat.js";
const port = process.env.PORT;
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/v1", chatRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
