import { Router } from 'express';
import * as DownloadApproved from './controller';

const routes = new Router();

routes.get('/student/download',DownloadApproved.download);

export default routes;