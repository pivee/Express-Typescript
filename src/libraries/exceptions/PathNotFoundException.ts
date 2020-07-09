import HttpException from "./HttpException";

class PathNotFoundException extends HttpException {

  constructor() {

    super(404, `Path not found`);

  }

}

export default PathNotFoundException;
