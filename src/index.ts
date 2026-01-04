import express, { Application } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import { PORT } from "./config/config";
import { connectionDatabase } from "./database/mongodb";

dotenv.config();

const app: Application = express();

// ⭐ MUST (यो line नभए body undefined हुन्छ)
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);



async function start() {
  await connectionDatabase();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start().catch(console.error);
