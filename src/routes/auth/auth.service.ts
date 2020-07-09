import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import {
  getRepository
} from "typeorm";

import {
  IToken,
  ITokenData
} from "../../interfaces/token.interface";

import User from "../../entities/user.entity";

//------------------------------------------------
// #region ----------------------------------- //. 🔻 🚧 Data Transfer Objects
//------------------------------------------------
import {
  RegisterDTO
} from "./auth.dto";
//------------------------------------------------
// #endregion ------------------------------------ 🔺 🚧 Data Transfer Objects
//------------------------------------------------

import UserWithThatEmailAlreadyExistsException from "../../libraries/exceptions/UserWithThatEmailAlreadyExistsException";
import WrongCredentialsException from "../../libraries/exceptions/WrongCredentialsException";

class AuthService {

  private repo = getRepository(User);

  public async register(userData: RegisterDTO) {

    if (
      await this.repo.findOne({
        email: userData.email,
      })
    ) {

      throw new UserWithThatEmailAlreadyExistsException(userData.email);

    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.repo.create({
      ...userData,
      password: hashedPassword,
    });

    await this.repo.save(user);

    delete user.password;

    const token = this.createToken(user);

    const cookie = this.createCookie(token);

    return {
      cookie,
      user,
    };

  }

  public createToken(user: IUser): IToken {

    const expiresIn = 60 * 60;

    const secret = process.env.JWT_SECRET;

    const tokenData: ITokenData = {
      id: user.id,
    };

    return {
      expiresIn,
      token: jwt.sign(tokenData, secret, {
        expiresIn,
      }),
    };

  }

  private createCookie(token: IToken) {

    return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`;

  }

}

export default AuthService;
