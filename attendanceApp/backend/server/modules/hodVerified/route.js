import { Router } from 'express';
import * as HodVerified from './controller';

const routes = new Router();

routes.post('/student/verified',HodVerified.verify);

export default routes;