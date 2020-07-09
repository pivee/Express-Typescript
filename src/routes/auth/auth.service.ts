import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import {
  getRepository
} from "typeorm";

import {
  IToken,
  ITokenData
} from "../../interfaces/token.interface";
import IUser from "../../interfaces/user.interface";

import User from "../../entities/user.entity";

//------------------------------------------------
// #region ----------------------------------- //. 🔻 🚧 Data Transfer Objects
//------------------------------------------------
import {
  RegisterDTO,
  LogInDTO
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

  public async logIn(
    logInData: LogInDTO
  ) {

    const user = await this.repo.findOne({
      email: logInData.email,
    });

    if (user) {

      const isPasswordOK = await bcrypt.compare(logInData.password, user.password);

      if (isPasswordOK) {

        delete user.password;

        const token = this.createToken(user);

        const cookie = this.createCookie(token);

        return {
          cookie,
          user,
        };

      } else {

        throw new WrongCredentialsException();

      }

    } else {

      throw new WrongCredentialsException();

    }

  }

  public logOut() {

    const cookie = this.deleteCookie();

    return {
      cookie,
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

  public createCookie(token: IToken) {

    return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`;

  }

  public deleteCookie() {

    return `Authorization=; HttpOnly; Max-Age=0`;

  }

}

export default AuthService;
