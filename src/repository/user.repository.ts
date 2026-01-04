import { IUser, UserModel } from "../models/user.model";

export interface IUserRepository {
  createUser(data: Partial<IUser>): Promise<IUser>;
  getUserByUsername(username: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;

  getUserById(id: string): Promise<IUser | null>;
  getAllUsers(): Promise<IUser[]>;
  updateOneUser(id: string, data: Partial<IUser>): Promise<IUser | null>;
  deleteOneUser(id: string): Promise<boolean>;
}

export class UserRepository implements IUserRepository {

  async createUser(data: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(data);
    const savedUser = await user.save();
    return savedUser;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email });
    return user;
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ username });
    return user;
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await UserModel.findById(id);
    return user;
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await UserModel.find();
    return users;
  }

  async updateOneUser(
    id: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    const user = await UserModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
    return user;
  }

  async deleteOneUser(id: string): Promise<boolean> {
    const user = await UserModel.findByIdAndDelete(id);
    return user !== null;
  }
}
