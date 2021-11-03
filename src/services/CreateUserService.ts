import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
}

export class CreateUserService {

  async execute({ name, email, admin }: IUserRequest) {
    const userRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email incorrect');
    }

    const userAlreadyExists = await userRepository.findOne({
      email
    });

    if (userAlreadyExists) {
      throw new Error('user already exists');
    }

    const user = userRepository.create({
      name,
      email,
      admin
    });

    await userRepository.save(user);

    return user;
  }
}