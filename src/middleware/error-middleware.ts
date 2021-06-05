/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import BaseException from '../exceptions/base-exception';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorMiddleware(error: BaseException, request: Request, response: Response, next: NextFunction): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    message,
    status,
  });
}

export default errorMiddleware;
