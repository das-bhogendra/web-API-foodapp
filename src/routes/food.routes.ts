import { Router } from "express";
import {
  authorizedMiddleware,
  adminOnlyMiddleware,
} from "../middlewares/authorization.middleware";
import { foodUpload } from "../middlewares/foodUpload";

import {
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getAllFoodItems,
  getFoodItemsByUser,
  getFoodItemsByType,
  getBestSellerFoodItems,
  getDiscountedFoodItems,
} from "../controllers/food.controller";

const router = Router();

// ================= PUBLIC ROUTES =================
router.get("/", getAllFoodItems);

// MUST BE ABOVE /type/:type to prevent route conflicts
router.get("/best-sellers", getBestSellerFoodItems);
router.get("/discounted", getDiscountedFoodItems);

router.get("/user/:userId", getFoodItemsByUser);
router.get("/type/:type", getFoodItemsByType);

// ================= AUTH ROUTES =================
// Only admin can create/update/delete food items

// ✅ Create Food Item with single image upload
router.post(
  "/",
  authorizedMiddleware,
  adminOnlyMiddleware,
  foodUpload.single("foodPhoto"), // ✅ changed here
  createFoodItem
);

// ✅ Update Food Item with optional single image upload
router.put(
  "/:id",
  authorizedMiddleware,
  adminOnlyMiddleware,
  foodUpload.single("foodPhoto"), // ✅ changed here
  updateFoodItem
);

// Delete Food Item
router.delete("/:id", authorizedMiddleware, adminOnlyMiddleware, deleteFoodItem);

export default router;
