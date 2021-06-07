import { Router, Request, Response, NextFunction } from 'express';
import axios, { AxiosInstance } from 'axios';
import Logger from '../logger';
import BaseException from '../exceptions/base-exception';
import Controller from '../interfaces/controller-interface';
import Constants from '../config/constants';

class NotionController implements Controller {
  #api: AxiosInstance;

  public path = '/notion';

  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
    this.#api = axios.create({
      baseURL: Constants.NOTION_PREFIX,
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        'Notion-Version': Constants.NOTION_VERSION,
      },
    });
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getDatabaseList`, this.getDatabaseList);
    this.router.get(`${this.path}/getDatabase`, this.getDatabase);
    this.router.get(`${this.path}/getPage`, this.getPage);
    this.router.get(`${this.path}/getBlockChildren`, this.getBlockChildren);
    this.router.get(`${this.path}/getUser`, this.getUser);
  }

  private getDatabaseList = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info('getDatabaseList called');

    try {
      const resp = await this.#api.get(`/databases`);
      res.send(resp.data);
    } catch (err: any) {
      Logger.error(err);
      next(new BaseException(400, err.message));
    }
  };

  private getDatabase = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info('getDatabase called');

    try {
      const resp = await this.#api.get(`/databases/${process.env.DATABASE_ID}`);
      res.send(resp.data);
    } catch (err: any) {
      Logger.error(err);
      next(new BaseException(400, err.message));
    }
  };

  private getBlockChildren = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info('getBlockChildren called');

    try {
      const resp = await this.#api.get(`/blocks/${process.env.BLOCK_ID}/children`);
      res.send(resp.data);
    } catch (err: any) {
      Logger.error(err);
      next(new BaseException(400, err.message));
    }
  };

  private getUser = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info('getUser called');

    try {
      const resp = await this.#api.get(`/users/${process.env.USER_ID}`);
      res.send(resp.data);
    } catch (err: any) {
      Logger.error(err);
      next(new BaseException(400, err.message));
    }
  };

  private getPage = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info('getPage called');
    try {
      const resp = await this.#api.get(`/pages/${process.env.PAGE_ID}`);
      res.send(resp.data);
    } catch (err: any) {
      Logger.error(err);
      next(new BaseException(400, err.message));
    }
  };
}

export default NotionController;
