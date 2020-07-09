import {
  Request, Response, NextFunction
} from "express";
import HttpException from "../libraries/exceptions/HttpException";
import PathNotFoundException from "../libraries/exceptions/PathNotFoundException";

export function pathNotFoundMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
): void {

  next(new PathNotFoundException());

}

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void {

  const status = error.status || 500;
  const message = error.message || `Something went wrong`;

  response.status(status).send({
    status,
    message,
  });

}

export default errorMiddleware;
