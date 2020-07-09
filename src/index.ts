import "dotenv/config";
import "reflect-metadata";
import {
  createConnection
} from "typeorm";

import App from "./App";

import config from "./ormconfig";

import validateEnvironment from "./tools/validateEnvironment";

//------------------------------------------------
// #region ----------------------------------- //. 🔻 🎮 Controllers
//------------------------------------------------
import PostController from "./routes/post/post.controller";
import AuthController from "./routes/auth/auth.controller";
//------------------------------------------------
// #endregion ------------------------------------ 🔺 🎮 Controllers
//------------------------------------------------

validateEnvironment();

(async () => {

  try {

    await createConnection(config);

  } catch (error) {

    console.error(`Database connection failed!\n`, error);

    return error;

  }

  const app = new App(
    [
      new PostController(),
      new AuthController(),
    ],
    parseInt(process.env.PORT)
  );

  app.listen();

})();

