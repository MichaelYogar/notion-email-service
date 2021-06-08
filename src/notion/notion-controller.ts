import { Router, Request, Response, NextFunction } from 'express';
import { Client } from '@notionhq/client';
import Logger from '../logger';
import BaseException from '../exceptions/base-exception';
import Controller from '../interfaces/controller-interface';

class NotionController implements Controller {
  #api: Client;

  public path = '/notion';

  public router: Router = Router();

  #key: string = process.env.NOTION_API_KEY as string;

  constructor() {
    this.initializeRoutes();
    // Initializing a client
    this.#api = new Client({
      auth: this.#key,
    });
  }

  private initializeRoutes() {
    // get requests
    this.router.get(`${this.path}/getDatabase`, this.getDatabase);
    this.router.get(`${this.path}/getPage`, this.getPage);
    this.router.get(`${this.path}/getBlockChildren`, this.getBlockChildren);
    this.router.get(`${this.path}/getUser`, this.getUser);
    this.router.get(`${this.path}/getUserList`, this.getUserList);
  }

  private getDatabase = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info('getDatabase called');

    const databaseId = '';

    try {
      const resp = await this.#api.databases.retrieve({
        database_id: databaseId,
      });
      res.send(resp);
    } catch (err: any) {
      Logger.error(err);
      next(new BaseException(400, err.message));
    }
  };

  private getBlockChildren = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info('getBlockChildren called');

    const blockId = '';
    try {
      const resp = await this.#api.blocks.children.list({
        block_id: blockId,
        page_size: 50,
      });
      res.send(resp);
    } catch (err: any) {
      Logger.error(err);
      next(new BaseException(400, err.message));
    }
  };

  private getUser = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info('getUser called');

    const userId = '';
    try {
      const resp = await this.#api.users.retrieve({ user_id: userId });
      res.send(resp);
    } catch (err: any) {
      Logger.error(err);
      next(new BaseException(400, err.message));
    }
  };

  private getUserList = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info('getUserList called');

    try {
      const resp = await this.#api.users.list();
      res.send(resp);
    } catch (err: any) {
      Logger.error(err);
      next(new BaseException(400, err.message));
    }
  };

  private getPage = async (req: Request, res: Response, next: NextFunction) => {
    Logger.info('getPage called');
    try {
      const pageId = '';
      const resp = await this.#api.pages.retrieve({ page_id: pageId });
      res.send(resp);
    } catch (err: any) {
      Logger.error(err);
      next(new BaseException(400, err.message));
    }
  };
}

export default NotionController;
