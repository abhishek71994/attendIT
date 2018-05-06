import { Router } from 'express';
import * as DownloadApproved from './controller';

const routes = new Router();

routes.post('/student/approved',DownloadApproved.download);

export default routes;