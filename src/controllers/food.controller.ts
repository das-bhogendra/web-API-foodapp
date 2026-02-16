import { Request, Response } from "express";
import { FoodItemService } from "../services/food.service";
import { CreateFoodItemDto, UpdateFoodItemDto } from "../dtos/food.dto";

const service = new FoodItemService();

// ================= DEFAULT IMAGE =================
const DEFAULT_IMAGE_URL =
  `${process.env.BASE_URL || "http://10.0.2.2:5005"}/public/food_photos/placeholder_food.jpg`;

export const createFoodItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id; // Must come from auth middleware
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // ✅ Debug (remove later)
    console.log("REQ BODY:", req.body);
    console.log("REQ FILE:", req.file);

    // Handle uploaded image OR default
    const imageUrl: string = req.file
      ? `${req.protocol}://${req.get("host")}/public/food_photos/${req.file.filename}`
      : DEFAULT_IMAGE_URL; // default if no image uploaded

    const dto: CreateFoodItemDto = {
      ...req.body,
      addedBy: userId.toString(),
      imageUrl,
    };

    const foodItem = await service.createFoodItem(dto);

    return res.status(201).json({
      success: true,
      message: "Food item created successfully",
      data: foodItem,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ================= GET ALL FOOD ITEMS =================
export const getAllFoodItems = async (_req: Request, res: Response) => {
  try {
    const items = await service.getAllFoodItems();
    return res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ================= GET FOOD ITEMS BY USER =================
export const getFoodItemsByUser = async (req: Request, res: Response) => {
  try {
    const items = await service.getFoodItemsByUser(req.params.userId);
    return res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ================= GET FOOD ITEMS BY TYPE =================
export const getFoodItemsByType = async (req: Request, res: Response) => {
  try {
    const items = await service.getFoodItemsByType(req.params.type);
    return res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ================= UPDATE FOOD ITEM =================
export const updateFoodItem = async (req: Request, res: Response) => {
  try {
    const dto: UpdateFoodItemDto = { ...req.body };

    // Ensure client cannot change 'addedBy'
    if ("addedBy" in dto) delete dto.addedBy;

    // Attach new image if uploaded OR default if missing
    if (req.file) {
      dto.imageUrl = `${req.protocol}://${req.get("host")}/public/food_photos/${req.file.filename}`;
    } else if (!dto.imageUrl) {
      dto.imageUrl = DEFAULT_IMAGE_URL; // ✅ assign default if missing
    }

    const updatedItem = await service.updateFoodItem(req.params.id, dto);

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    return res.status(200).json({ success: true, message: "Food item updated", data: updatedItem });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ================= DELETE FOOD ITEM =================
export const deleteFoodItem = async (req: Request, res: Response) => {
  try {
    const deletedItem = await service.deleteFoodItem(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    return res.status(200).json({ success: true, message: "Food item deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ================= GET BEST SELLER FOOD ITEMS =================
export const getBestSellerFoodItems = async (_req: Request, res: Response) => {
  try {
    const items = await service.getBestSellerFoodItems();
    return res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// ================= GET DISCOUNTED FOOD ITEMS =================
export const getDiscountedFoodItems = async (_req: Request, res: Response) => {
  try {
    const items = await service.getDiscountedFoodItems();
    return res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
