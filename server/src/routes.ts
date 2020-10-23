import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import UsersController from './controllers/UsersController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', (request, response) => OrphanagesController.index(request, response));
routes.get('/orphanages/:id', (request, response) => OrphanagesController.show(request, response));
routes.post('/orphanages', upload.array('images'), (request, response) => OrphanagesController.create(request, response));

routes.post('/login', (request, response) => UsersController.index(request, response));
routes.post('/register', (request, response) => UsersController.index(request, response));
routes.post('/reset', (request, response) => UsersController.index(request, response));
routes.post('/update', (request, response) => UsersController.index(request, response));

export default routes;