import * as express from "express";

import {
  getRepository
} from "typeorm";

import Controller from "../../interfaces/controller.interface";
import IPost from "../../interfaces/post.interface";
import Post from "./post.entity";

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
  private postRepository = getRepository(Post);

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

    /*
     * Create
     */
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreatePostDTO),
      this.createPost
    );
    /*
     * Get All
     */
    this.router.get(
      `${this.path}/list`,
      this.getAllPosts
    );
    /*
     * Get One by ID
     */
    this.router.get(
      `${this.path}/:id`,
      this.getPostById
    );
    /**
     * Update One by ID
     */
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(CreatePostDTO, true),
      this.modifyPost
    );
    /**
     * Delete One by ID
     */
    this.router.delete(
      `${this.path}/:id`,
      this.deletePost
    );

  }

  createPost = (
    request: express.Request,
    response: express.Response
  ): void => {

    const post: IPost = request.body;
    this.postList.push(post);
    response.send(post);

  }

  getAllPosts = (
    request: express.Request,
    response: express.Response
  ): void => {

    response.send(this.postList);

  }

}

export default PostController;
