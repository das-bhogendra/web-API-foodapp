import { CreateUserDto, LoginUserDto } from "../dtos/user.dto";
import { UserRepository } from "../repository/user.repository";
import { PasswordUtil } from "../utils/password.utils";
import { JwtUtil } from "../utils/jwt.utils";
import { HttpError } from "../errors/http.error";

const userRepo = new UserRepository();

export class UserService {

  async registerUser(dto: CreateUserDto) {

    const [emailExists, usernameExists] = await Promise.all([
      userRepo.getUserByEmail(dto.email),
      userRepo.getUserByUsername(dto.username),
    ]);

    if (emailExists) {
      throw new HttpError(409, "Email already registered");
    }

    if (usernameExists) {
      throw new HttpError(409, "Username already taken");
    }

    const hashedPassword = await PasswordUtil.hash(dto.password);

    const user = await userRepo.createUser({
      fullName: dto.fullName,
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      role: dto.role ?? "user",
      phoneNumber: dto.phoneNumber,
      profilePicture: dto.profilePicture,
    });

    return user;
  }

  async loginUser(dto: LoginUserDto) {

    const user = await userRepo.getUserByEmail(dto.email);

    if (!user) {
      throw new HttpError(404, "Invalid credentials");
    }

    const isValid = await PasswordUtil.compare(
      dto.password,
      user.password
    );

    if (!isValid) {
      throw new HttpError(401, "Invalid credentials");
    }

    const token = JwtUtil.sign({
      id: user._id,
      role: user.role,
    });

    const { password, ...safeUser } = user.toObject();

    return {
      token,
      user: safeUser,
    };
  }
}
