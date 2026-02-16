import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectionDatabase } from "./database/mongodb";
import cors from "cors";

import path from "path";

dotenv.config();
// Yo bhanda tala .env chalauna milcha
console.log(process.env.PORT);
import authRoutes from "./routes/auth.route";
import adminUserRoutes from "./routes/admin/user.routes";
import foodRoutes from "./routes/food.routes";


const app: Application = express();

let corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3003"],
  // which url can access backend
  // put your frontend domain/url here
};
// origin: "*",  // yo le sabai url lai access dincha
app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "../uploads"))); // static file serving
app.use("/public", express.static(path.join(__dirname, "../public"))); // static file serving for food photos

// const PORT: number = 3000;

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.use("/api/admin/users", adminUserRoutes);

app.use("/api/food", foodRoutes);


export default app;