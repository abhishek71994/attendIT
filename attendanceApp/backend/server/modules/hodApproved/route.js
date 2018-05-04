import { Router } from 'express';
import * as HodVerified from './controller';

const routes = new Router();

routes.post('/student/approved',HodVerified.approve);

export default routes;