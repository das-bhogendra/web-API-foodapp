import { Request, Response } from "express";
import { z } from "zod";

import { UserRepository } from "../../repository/user.repository";
import { HttpError } from "../../errors/http.error";
import { UserService } from "../../services/user.service";
import { CreateUserDto, LoginUserDto, UpdateUserDto } from "../../dtos/user.dto";

const userRepo = new UserRepository();
const userService = new UserService();

export class UserController {

  // REGISTER USER
  registerUser = async (req: Request, res: Response) => {
    try {
      const parsed = CreateUserDto.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ errors: parsed.error });

      const user = await userService.registerUser(parsed.data);

      // Convert _id to string for API
      const { _id, password, ...safeUser } = user.toObject();
      safeUser._id = _id.toString();

      return res.status(201).json(safeUser);

    } catch (err: any) {
      if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // LOGIN USER
  loginUser = async (req: Request, res: Response) => {
    try {
      const parsed = LoginUserDto.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ errors: parsed.error });

      const { token, user } = await userService.loginUser(parsed.data);

      // Convert _id to string for API
      const { _id, password, ...safeUser } = user.toObject();
      safeUser._id = _id.toString();

      res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,        // localhost
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

      return res.status(200).json({ token, user: safeUser });

    } catch (err: any) {
      if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // CREATE USER (Admin)
createUser = async (req: Request, res: Response) => {
  try {
    // Multer image
    const image = req.file?.filename;

    const parsed = CreateUserDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error });

    // Add image path if uploaded
    const data = { ...parsed.data, image };

    const user = await userService.registerUser(data);

    const { _id, password, ...safeUser } = user.toObject();
    safeUser._id = _id.toString();

    return res.status(201).json(safeUser);
  } catch (err: any) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


  // GET ALL USERS
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await userRepo.getAllUsers();

      // Convert _id to string for all users
      const safeUsers = users.map(u => {
        const { _id, password, ...user } = u.toObject();
        user._id = _id.toString();
        return user;
      });

      return res.status(200).json(safeUsers);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // GET USER BY ID
  getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userRepo.getUserById(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const { _id, password, ...safeUser } = user.toObject();
      safeUser._id = _id.toString();

      return res.status(200).json(safeUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // UPDATE USER
  updateUser = async (req: Request, res: Response) => {
    try {
      const parsed = UpdateUserDto.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ errors: parsed.error });

      const { id } = req.params;
      const updatedUser = await userRepo.updateOneUser(id, parsed.data);
      if (!updatedUser) return res.status(404).json({ message: "User not found" });

      const { _id, password, ...safeUser } = updatedUser.toObject();
      safeUser._id = _id.toString();

      return res.status(200).json(safeUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // DELETE USER
  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await userRepo.deleteOneUser(id);
      if (!deleted) return res.status(404).json({ message: "User not found" });

      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

