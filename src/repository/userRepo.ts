import db from "../config/database";
import { CreateUserRequest } from "../model/UserModel";

export class userRepo {
  static async create(user: CreateUserRequest) {
    return await user;
  }

  static async all() {
    return await "display all users";
  }
}
