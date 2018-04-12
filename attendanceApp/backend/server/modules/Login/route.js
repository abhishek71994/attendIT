import { Router } from 'express';
import * as Login from './controller';

const routes = new Router();

routes.post('/login',Login.verify);

export default routes;