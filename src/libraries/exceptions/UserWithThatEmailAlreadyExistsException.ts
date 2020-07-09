import HttpException from "./HttpException";

class UserWithThatEmailAlreadyExistsException extends HttpException {

  constructor(email: string) {

    super(400, `User with that email already exists. (Email: ${email})`);

  }

}

export default UserWithThatEmailAlreadyExistsException;
