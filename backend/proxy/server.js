import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(cors()); // Allows your Vercel frontend to talk to this link

// Route /user requests to the User Service
app.use(
  "/user",
  createProxyMiddleware({
    target: process.env.USER_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/user": "" }, // Removes /user before sending to the microservice
  }),
);

// Route /mail requests to the Mail Service
app.use(
  "/mail",
  createProxyMiddleware({
    target: process.env.MAIL_SERVICE,
    changeOrigin: true,
    pathRewrite: { "^/mail": "" },
  }),
);

// Route /chat requests to the Chat Service (Supports WebSockets)
app.use(
  "/chat",
  createProxyMiddleware({
    target: process.env.CHAT_SERVICE,
    changeOrigin: true,
    ws: true, // Enables WebSocket upgrading for your chat app
    pathRewrite: { "^/chat": "" },
  }),
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Gateway running on port ${PORT}`));
