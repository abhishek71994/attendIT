import { Router } from 'express';
import * as HodApproved from './controller';

const routes = new Router();

routes.post('/student/approved',HodApproved.approve);

export default routes;