import { Response, Request, NextFunction } from 'express';
import { Methods } from '../contants';

export interface Route {
  path: string;
  method: Methods;
  handler: (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
  localMiddleware: ((req: Request, res: Response, next: NextFunction) => void)[];
}
