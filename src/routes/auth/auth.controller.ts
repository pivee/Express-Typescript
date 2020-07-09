import * as express from "express";

import IController from "../../interfaces/controller.interface";

//------------------------------------------------
// #region ----------------------------------- //. 🔻 ⚙ Middlewares
//------------------------------------------------
import validationMiddleware from "../../middlewares/validation.middleware";
//------------------------------------------------
// #endregion ------------------------------------ 🔺 ⚙ Middlewares
//------------------------------------------------

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

import AuthService from "./auth.service";

class AuthController implements IController {

  public path = `/auth`;
  public router = express.Router();

  private authService = new AuthService();

  constructor() {

    this.intializeRoutes();

  }

  public intializeRoutes(): void {

    /*
     * Create: Register
     */
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(RegisterDTO),
      this.registerUser
    );
    /*
     * Log in
     */
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDTO),
      this.logInUser
    );
    /*
     * Log out
     */
    this.router.get(
      `${this.path}/logout`,
      this.logOutUser
    );

  }

  private registerUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {

    const userData: RegisterDTO = request.body;

    try {

      const {
        cookie,
        user
      } = await this.authService.register(userData)

      response.setHeader(
        `Set-Cookie`,
        [
          cookie
        ]
      );

      response.send(user)

    } catch (error) {

      next(error);

    }

  }

}

  private logInUser = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {

  const logInData: LogInDTO = request.body;

  const user = await this.repo.findOne({
    email: logInData.email,
  });

  if (user) {

    const isPasswordOK = await bcrypt.compare(logInData.password, user.password);

    if (isPasswordOK) {

      delete user.password;

      const token = this.createToken(user);

      response.setHeader(
        `Set-Cookie`,
        [
          this.createCookie(token),
        ]
      );

      response.send(user);

    } else {

      next(new WrongCredentialsException());

    }

  } else {

    next(new WrongCredentialsException());

  }

}

  private logOutUser = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {

  response.setHeader(
    `Set-Cookie`,
    [
      `Authorization=;Max-Age=0`,
    ]
  );

  response.sendStatus(200);

}
  private createToken(user: IUser): IToken {

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

export default AuthController;
