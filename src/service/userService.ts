import { userRepo } from "../repository/userRepo";
import { CreateUserRequest } from "../dtos/userDto";

export const userService = {
  async create(user: CreateUserRequest) {
    return await userRepo.create(user);
  },

  async findAll() {
    return await userRepo.findAll();
  },
};
