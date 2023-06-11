import express, { Router, Request, Response } from 'express';
import UserController from '../controllers/UserController';
import { UserService } from '../services/UserService';

const router: Router = express.Router();
const userService: UserService = new UserService();
const userController: UserController = new UserController(userService);

router.get('/', (request: Request, response: Response) => {
    userController.index(request, response);
});

router.get('/:id', (request: Request, response: Response) => {
    userController.show(request, response);
});

router.post('/', (request: Request, response: Response) => {
    userController.create(request, response);
});

router.put('/:id', (request: Request, response: Response) => {
    userController.update(request, response);
});

router.delete('/:id', (request: Request, response: Response) => {
    userController.delete(request, response);
});

export default router;
