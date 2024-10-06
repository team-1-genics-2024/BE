import { userRepo } from "../repository/userRepo";
import { CreateUserRequest } from "../model/UserModel";

export class userService {
  static async create(data: CreateUserRequest) {
    return await userRepo.create(data);
  }

  static async getAllUser() {
    return await userRepo.all();
  }
}
