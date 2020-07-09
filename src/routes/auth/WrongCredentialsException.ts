import HttpException from "../../libraries/exceptions/HttpException";

class WrongCredentialsException extends HttpException {

  constructor() {

    super(401, `Wrong credentials`);

  }

}

export default WrongCredentialsException;
