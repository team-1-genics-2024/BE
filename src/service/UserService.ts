import {
   CreateUserRequest, 
   GetAllUsersResponse, 
   GetUserResponse, 
   UpdatePasswordGoogleUser, 
   UpdateUserRequest, 
   UpdateUserResponse
   } from "../model/UserModel";
import { AuthRequest } from "../model/AuthModel";
import { UserRepository } from "../repository/UserRepository";
import { UserValidation } from "../validation/UserValidation";
import { Validation } from "../utils/validation";
import { ResponseError } from "../error/ResponseError";
import bcrypt from "bcrypt";
import { verifyOldPassword } from "../utils/verifyOldPassword";

export class UserService {

  static async registerUser (request: CreateUserRequest) {
    const data = Validation.validation(UserValidation.REGISTER, request);

    const userExists = await UserRepository.findByEmail(data.email);

    if (userExists) {
      throw new ResponseError(409, "User already exists");
    }

    const salt: number = parseInt(process.env.SALT_ROUNDS || "");
    data.password = await bcrypt.hash(data.password, salt);

    return await UserRepository.create(data.email, data.password, data.name);
  }

  static async updatePasswordForGoogleUser(auth: AuthRequest, request: UpdatePasswordGoogleUser): Promise<UpdateUserResponse> {
    const data = Validation.validation(UserValidation.UPDATE_PASSWORD_GOOGLE_USER, request);

    const userId = auth.user?.id as number;
    const user = await UserRepository.findById(userId);

    if(!user || user.googleId === null) {
      throw new ResponseError(401, "Unauthorized!");
    }

    const salt: number = parseInt(process.env.SALT_ROUNDS || "");
    data.password = await bcrypt.hash(data.password, salt);

    const updatedData = await UserRepository.findByIdAndUpdate(userId, { password: data.password });

    return {
      name: updatedData.name,
      email: updatedData.email,
    }
  }

  static async getUser(auth: AuthRequest): Promise<GetUserResponse> {
    const userId: number = auth.user?.id as number;
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new ResponseError(404, "Unauthorized!");
    }

    return {
      name: user.name,
      email: user.email,
    };
  }

  static async updateUser(auth: AuthRequest, request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const userId: number = auth.user?.id as number;
    const data = Validation.validation(UserValidation.UPDATE, request);

    if(!data.email && !data.name && !data.password) {
      throw new ResponseError(400, "At least one field must be updated");
    }

    if(data.password) {
      if(!data.oldPassword) {
        throw new ResponseError(400, "Old password is required");
      }

      const user = await UserRepository.findById(userId);
      const isMatch = await verifyOldPassword(data.oldPassword, user?.password as string);

      if (!isMatch) {
        throw new ResponseError(400, "Old password is incorrect");
      }

      const salt: number = parseInt(process.env.SALT_ROUNDS || "");
      data.password = await bcrypt.hash(data.password, salt);
    }

    const updatedUser = await UserRepository.findByIdAndUpdate(userId, data);

    if (!updatedUser) {
      throw new ResponseError(404, "Unauthorized!");
    }

    return {
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }
}