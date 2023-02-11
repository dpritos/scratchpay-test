import { Response, Router } from 'express';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import { Methods } from '../contants';
import { Route } from '../contracts';
import * as log from '../lib/logger';

export default abstract class Controller {
  public router: Router = Router();
  public abstract path: string;
  protected readonly routes: Array<Route> = [];

  public setRoutes = (): Router => {
    for (const route of this.routes) {
      for (const mw of route.localMiddleware) {
        this.router.use(route.path, mw);
      }
      switch (route.method) {
        case Methods.GET:
          this.router.get(route.path, route.handler);
          break;
        default:
          log.info('not a valid method');
          break;
      }
    }

    return this.router;
  };

  protected sendSuccess(res: Response, message?: string, data?: any): Response {
    return res.status(OK).json({
      message: message || 'Success',
      data: data || null
    });
  }

  protected sendError(res: Response, message?: string): Response {
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: message || 'Internal server error'
    });
  }
}
