import { Router } from 'express';
import * as HodVerified from './controller';

const routes = new Router();

routes.post('/student/approved',HodVerified.approved());

export default routes;