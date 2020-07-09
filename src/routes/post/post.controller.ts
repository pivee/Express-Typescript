import * as express from "express";

import {
  getRepository
} from "typeorm";

import Controller from "../../interfaces/controller.interface";
import IRequestWithUser from "../../interfaces/requestWithUser.interface";

import Post from "../../entities/post.entity";

//------------------------------------------------
// #region ----------------------------------- //. 🔻 ⚙ Middlewares
//------------------------------------------------
import validationMiddleware from "../../middlewares/validation.middleware";
import authMiddleware from "../../middlewares/auth.middleware";
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

import PostNotFoundException from "./PostNotFoundException";

class PostController implements Controller {

  public path = `/post`;
  public router = express.Router();
  private postRepository = getRepository(Post);

  constructor() {

    this.intializeRoutes();

  }

  public intializeRoutes(): void {

    /*
     * Create
     */
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreatePostDTO),
      this.createPost
    );
    /*
     * Get All
     */
    this.router.get(
      `${this.path}/list`,
      this.getPostList
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

  private createPost = async (
    request: IRequestWithUser,
    response: express.Response
  ) => {

    const postData: CreatePostDTO = request.body;

    const newPost = {
      ...postData,
      author_id: request.user.id,
    };

    const createdPost = this.postRepository.create(newPost);

    await this.postRepository.save(createdPost);

    response.send(createdPost);

  }

  private getPostList = async (
    request: express.Request,
    response: express.Response
  ) => {

    const postList = await this.postRepository.find();

    response.send(postList);

  }

  private getPostById = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {

    const id = request.params.id;

    const post = await this.postRepository.findOne(id);

    if (post) {

      response.send(post);

    } else {

      next(new PostNotFoundException(id));

    }

  }

  private modifyPost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {

    const id = request.params.id;

    const postData = request.body;

    await this.postRepository.update(
      id,
      postData
    );

    const updatedPost = await this.postRepository.findOne(id);

    if (updatedPost) {

      response.send(updatedPost);

    } else {

      next(new PostNotFoundException(id));

    }

  }

  private deletePost = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {

    const id = request.params.id;

    const deleteResponse = await this.postRepository.delete(id);

    if (deleteResponse.raw[1]) {

      response.sendStatus(200);

    } else {

      next(new PostNotFoundException(id));

    }

  }

}

export default PostController;
