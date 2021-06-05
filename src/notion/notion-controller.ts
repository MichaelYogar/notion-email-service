import { Router, Request, Response, NextFunction } from 'express';
import BaseException from '../exceptions/base-exception';
import Controller from '../interfaces/controller-interface';

class NotionController implements Controller {
  public path = '/test';

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.example}/:id`, exampleMiddleware, this.exampleFunction);
    this.router.get(`${this.path}`, this.helloWorld);
  }

  private helloWorld = async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line no-constant-condition
    if (true) {
      next(new BaseException(400, 'this is done on purpose'));
    } else {
      res.send('hello world');
    }
  };
}

export default NotionController;
