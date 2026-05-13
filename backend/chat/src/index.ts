// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import connectDB from "./config/db.js";
// import chatRoutes from "./routes/chat.js";
// import cors from "cors";
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/api/v1", chatRoutes);

// const port = process.env.PORT;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// 1. CRITICAL: Force dotenv to preload BEFORE any other imports load into memory
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chat.js";

// 2. Safely initialize database connection
connectDB();

const app = express();

// 3. Mount foundational middlewares
app.use(express.json());
app.use(cors());

// 4. Mount application routing rules
app.use("/api/v1", chatRoutes);

// 5. FIX: Express Global Error Handler to catch all Multer & Cloudinary exceptions
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.log(
      "================== 💥 CRITICAL MIDDLEWARE ERROR ==================",
    );
    // Expands the full object tree inside your terminal so you can see hidden properties
    console.dir(err, { depth: null, colors: true });
    if (err.stack) {
      console.error("📋 Stack Trace:", err.stack);
    }
    console.log(
      "==================================================================",
    );

    // Send clean JSON back to the client, preventing HTML page outputs entirely
    res.status(err.status || 500).json({
      success: false,
      message: err.message || "An internal server error occurred",
      errorDetails: typeof err === "object" ? err : String(err),
    });
  },
);

// 6. Read port safely now that environment variables are fully loaded
const port = process.env.PORT || 5002;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
