import * as express from "express";
import Controller from "../../interfaces/controller.interface";
import IPost from "../../interfaces/post.interface";

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
  CreatePostDTO
} from "./post.dto";
//------------------------------------------------
// #endregion ------------------------------------ 🔺 🚧 Data Transfer Objects
//------------------------------------------------

class PostController implements Controller {

  public path = `/post`;
  public router = express.Router();

  private postList: IPost[] = [
    {
      author: `Pivithuru`,
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, eius corrupti. Libero quisquam vero temporibus eveniet ut consequatur, impedit optio delectus enim inventore vel, laborum aperiam neque quos non ad!`,
      title: `Lorem Ipsum`,
    },
  ];

  constructor() {

    this.intializeRoutes();

  }

  public intializeRoutes(): void {

    this.router.get(
      `${this.path}/list`,
      this.getAllPosts
    );
    this.router.post(
      `${this.path}/create`,
      validationMiddleware(CreatePostDTO),
      this.createAPost
    );

  }

  private getAllPosts = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {

    response.send(this.postList);

  }

  private createAPost = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {

    const post: IPost = request.body;
    this.postList.push(post);
    response.send(post);

  }

}

export default PostController;
