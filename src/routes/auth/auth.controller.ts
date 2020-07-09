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
        user,
      } = await this.authService.register(userData);

      response.setHeader(
        `Set-Cookie`,
        [
          cookie,
        ]
      );

      response.send(user);

    } catch (error) {

      next(error);

    }

  }

  private logInUser = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {

    const logInData: RegisterDTO = request.body;

    try {

      const {
        cookie,
        user,
      } = await this.authService.logIn(logInData);

      response.setHeader(
        `Set-Cookie`,
        [
          cookie,
        ]
      );

      response.send(user);

    } catch (error) {

      next(error);

    }

  }

  private logOutUser = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {

    const {
      cookie,
    } = this.authService.logOut();

    response.setHeader(
      `Set-Cookie`,
      [
        cookie,
      ]
    );

    response.sendStatus(200);

  }

}

export default AuthController;
