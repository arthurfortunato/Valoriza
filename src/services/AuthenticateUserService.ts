import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    //Verificar se o email existe
    const user = await usersRepositories.findOne({
      email
    });
    if (!user) {
      throw new Error('Email/Password incorrect')
    }

    //Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email/Password incorrect')
    }

    //Gerar Token
    const token = sign({
      email: user.email,
    }, "6e7ad9b8cbd15010cb39e80d80d7e753",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );
    return token;
  }
}

