import { Router, Request, Response, NextFunction } from 'express';
import Logger from '../logger';
import BaseException from '../exceptions/base-exception';
import Controller from '../interfaces/controller-interface';
import Constants from '../config/constants';
const axios = require('axios').default;

class NotionController implements Controller {
  api = axios.create({
    baseURL: Constants.NOTION_PREFIX,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': Constants.NOTION_VERSION,
    },
  });

  public path = '/notion';

  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.example}/:id`, exampleMiddleware, this.exampleFunction);
    this.router.get(`${this.path}/getDatabaseList`, this.getDatabaseList);
  }

  private getDatabaseList = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info('getDatabaseList called');
    try {
      const resp = await this.api.get(`/databases`);
      res.send(resp.data);
    } catch (err: any) {
      next(new BaseException(400, err.message));
    }
  };
}

export default NotionController;
