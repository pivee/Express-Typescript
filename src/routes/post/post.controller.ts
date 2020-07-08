import * as express from "express";
import Controller from "../../interfaces/controller.interface";
import Post from "../../interfaces/post.interface";

class PostController implements Controller {

  public path = `/post`;
  public router = express.Router();

  private postList: Post[] = [
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

    this.router.get(`${this.path}/list`, this.getAllPosts);
    this.router.post(`${this.path}/create`, this.createAPost);

  }

  getAllPosts = (request: express.Request, response: express.Response) => {

    response.send(this.postList);

  }

  createAPost = (request: express.Request, response: express.Response) => {

    const post: Post = request.body;
    this.postList.push(post);
    response.send(post);

  }

}

export default PostController;
