import { prisma } from "../config/database";
import { CreateUserRequest } from "../dtos/userDto";

export const userRepo = {
  async create(user: CreateUserRequest) {
    return await user;
  },

  async findAll() {
    return await "display all users";
  },
};
