import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/http.error";
import { UserRepository } from "../repository/user.repository";
import { IUser } from "../models/user.model";
import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // keep original Mongoose ObjectId type
    }
  }
}

const userRepository = new UserRepository();

// ---------------- AUTHORIZED MIDDLEWARE ----------------
export const authorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError(401, "Unauthorized: Header malformed");
    }

    const token = authHeader.split(" ")[1];
    if (!token) throw new HttpError(401, "Unauthorized: Token missing");

    const decodedToken = jwt.verify(token, JWT_SECRET) as { id: string };
    if (!decodedToken?.id) throw new HttpError(401, "Unauthorized: Token invalid");

    const user = await userRepository.getUserById(decodedToken.id);
    if (!user) throw new HttpError(401, "Unauthorized: User not found");

    // ✅ Keep original ObjectId type (no .toString())
    req.user = user;

    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message || "Unauthorized",
    });
  }
};

// ---------------- ADMIN ONLY ----------------
export const adminOnlyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === "admin") {
    return next();
  }
  return res.status(403).json({ success: false, message: "Forbidden, Admin only" });
};

// ---------------- USER OR ADMIN CHECK (OPTIONAL) ----------------
export const userOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  // controller should still check ownership (order.userId) when needed
  if (req.user) return next();
  return res.status(403).json({ success: false, message: "Forbidden" });
};
