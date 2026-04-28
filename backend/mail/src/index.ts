import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { startSendOTPConsumer } from "./consumer.js";
startSendOTPConsumer();
const app = express();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});
