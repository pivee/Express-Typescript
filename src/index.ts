import "dotenv/config";

import App from "./App";
import PostController from "./routes/Post/post.controller";

import validateEnvironment from "./tools/validateEnvironment";

validateEnvironment();

const app = new App(
  [
    new PostController(),
  ],
  parseInt(process.env.PORT)
);

app.listen();
