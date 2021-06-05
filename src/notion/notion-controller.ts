import { Router, Request, Response } from 'express';
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

  private helloWorld = async (req: Request, res: Response) => {
    res.send('hello world');
  };
}

export default NotionController;
