import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route";
import adminUserRoutes from "./routes/admin/user.routes";
import { connectionDatabase } from "./database/mongodb";

dotenv.config();

const app: Application = express();

// ⭐ Use PORT from .env or fallback
const PORT = process.env.PORT || 5005;

// =======================
// MIDDLEWARES
// =======================

// Parse JSON body (increase limit if needed)
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// =======================
// STATIC FILES
// =======================

// Serve public folder
app.use("/public", express.static(path.join(__dirname, "../public")));

// Serve uploads folder (Multer images)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// =======================
// ROUTES
// =======================

// Auth routes (register/login)
app.use("/api/auth", authRoutes);

// Admin user routes (full CRUD + image upload)
app.use("/api/admin/users", adminUserRoutes);

// =======================
// GLOBAL ERROR HANDLER (Optional but recommended)
// =======================
app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Global error:", err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
);

// =======================
// START SERVER
// =======================
async function start() {
  try {
    // Connect to MongoDB
    await connectionDatabase();
    console.log("✅ MongoDB connected");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
}

start();
