import { CreateUserDto, LoginUserDto } from "../../dtos/user.dto";
import { UserService } from "../../services/user.service";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import z from "zod";

let userService = new UserService();

export class AuthController {

  async register(req: Request, res: Response) {
  try {
    const parsedData = CreateUserDto.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: z.prettifyError(parsedData.error)
      });
    }

    const newUser = await userService.registerUser(parsedData.data);

    // 🔐 Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // 🍪 Set HttpOnly cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // production me true
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // ✅ Remove password before sending
    const { password, ...safeUser } = newUser.toObject();

    return res.status(201).json({
      success: true,
      data: safeUser,
      token, // optional, cookie already has it
      message: "Register success"
    });

  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
}

async login(req: Request, res: Response) {
  try {
    const parsedData = LoginUserDto.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        success: false,
        message: z.prettifyError(parsedData.error)
      });
    }

    const { token, user } = await userService.loginUser(parsedData.data);

    // Remove password
    const { password, ...safeUser } = user;

    // Set cookie just like UserController
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // production me true
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      data: safeUser,
      token, // optional
      message: "Login success"
    });

  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
}
}