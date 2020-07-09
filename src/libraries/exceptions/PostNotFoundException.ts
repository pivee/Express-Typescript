import HttpException from "./HttpException";

class PostNotFoundException extends HttpException {

  constructor(id: string) {

    super(404, `Post not found. (Post ID: ${id})`);

  }

}

export default PostNotFoundException;
