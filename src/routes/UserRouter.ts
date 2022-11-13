import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const UserRouter = Router();
UserRouter.route('/').get(UserController.getUsers);
UserRouter.route('/:id').get(UserController.getUserById);
UserRouter.route('/:id').delete(UserController.deleteUser);
UserRouter.route('/').post(UserController.createUser);

export { UserRouter };
