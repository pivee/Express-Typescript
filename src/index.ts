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
import PostController from "./routes/Post/post.controller";
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
    ],
    parseInt(process.env.PORT)
  );

  app.listen();

})();

