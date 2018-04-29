import { Router } from 'express';
import * as Filer from './controller';
import multer from 'multer';

//set storage engine
// const storage = multer.memoryStorage({

// });

const upload = multer({ dest:'../../uploads/' });

const routes = new Router();

routes.post('/upload/attendance',upload.single('csvfile'), Filer.handleFile);
export default routes;