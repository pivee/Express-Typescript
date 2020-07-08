import App from "./App";
import PostController from "./routes/Post/post.controller";

const app = new App(
  [
    new PostController(),
  ],
  5000
);

app.listen();
