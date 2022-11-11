import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const UserRouter = Router();
UserRouter.route('/').get(UserController.getUsers);
UserRouter.route('/:id').get(UserController.getUserById);
UserRouter.route('/create').post(UserController.createUser);

export { UserRouter };
