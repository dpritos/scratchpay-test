import { Application, RequestHandler } from 'express';

import Controller from './controller';
import * as log from '../lib/logger';

export default class Server {
  private app: Application;
  private readonly port: number;

  constructor(app: Application, port: number) {
    this.app = app;
    this.port = port;
  }

  public run(): any {
    return this.app.listen(this.port, () => {
      log.info(`The server is running on port ${this.port}`);
    });
  }

  public loadMiddleware(middlewares: Array<RequestHandler>): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  public loadControllers(controllers: Array<Controller>): void {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.setRoutes());
    });
  }
}
