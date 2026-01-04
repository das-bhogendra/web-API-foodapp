import { Router } from "express";
import { AuthController } from "../controllers/admin/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/login",authController.login);
export default router;
