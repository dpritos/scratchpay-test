// express
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';

dotenv.config();

// important entities
import { Server, Controller } from './entities';

// controllers
import { ClinicController } from './controllers';

const app: express.Application = express();
const server: Server = new Server(app, 8080);

const controllers: Array<Controller> = [new ClinicController()];

const globalMiddleware: Array<express.RequestHandler> = [
  express.json(),
  express.urlencoded(),
  morgan(':method :url :status :res[content-length] - :response-time ms'),
  cors()
];

server.loadMiddleware(globalMiddleware);
server.loadControllers(controllers);
server.run();
