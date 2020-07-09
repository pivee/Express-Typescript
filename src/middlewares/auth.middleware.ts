import {
  Response,
  NextFunction,
  response
} from "express";
import * as jwt from "jsonwebtoken";

import {
  getRepository
} from "typeorm";

import {
  ITokenData
} from "../interfaces/token.interface";
import IRequestWithUser from "../interfaces/requestWithUser.interface";

import User from "../entities/user.entity";

import WrongAuthenticationTokenException from "../routes/auth/WrongAuthenticationTokenException";
import AuthenticationTokenMissingException from "../routes/auth/AuthenticationTokenMissingException";

async function authMiddleware(
  request: IRequestWithUser,
  response: Response,
  next: NextFunction
) {

  const cookies = request.cookies;

  if (cookies && cookies.Authorization) {

    const secret = process.env.JWT_SECRET;

    try {

      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as ITokenData;

      const id = verificationResponse.id;

      const user = await getRepository(User).findOne(id);

      if (user) {

        request.user = user;

        next();

      } else {

        next(new WrongAuthenticationTokenException());

      }

    } catch (error) {

      next(new WrongAuthenticationTokenException());

    }

  } else {

    next(new AuthenticationTokenMissingException());

  }

}

export default authMiddleware;
