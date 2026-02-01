import { Router } from "express";

import { authorizedMiddleware } from "../middlewares/authorization.middleware";
import { uploads } from "../middlewares/upload.middleware";
import { AuthController } from "../controllers/auth.controller";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/profile", authorizedMiddleware, uploads.single('profilePicture'), authController.updateProfile);
export default router;
