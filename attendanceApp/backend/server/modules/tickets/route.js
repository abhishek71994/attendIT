import { Router } from 'express';
import * as TickerController from './controller';

const routes = new Router();

routes.post('/ticket',TickerController.createTicket);

export default routes;