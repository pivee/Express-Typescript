import "dotenv/config";

import App from "./App";

import validateEnvironment from "./tools/validateEnvironment";

//------------------------------------------------
// #region ----------------------------------- //. 🔻 🎮 Controllers
//------------------------------------------------
import PostController from "./routes/Post/post.controller";
//------------------------------------------------
// #endregion ------------------------------------ 🔺 🎮 Controllers
//------------------------------------------------

validateEnvironment();

const app = new App(
  [
    new PostController(),
  ],
  parseInt(process.env.PORT)
);

app.listen();
