import { Router } from 'express';
import * as StudentList from './controller';

const routes = new Router();

routes.post('/student/verified',StudentList.verify);

export default routes;