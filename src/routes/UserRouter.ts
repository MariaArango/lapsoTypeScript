import { Router } from 'express';
import { UserController } from '../controllers/UserController';


const UserRouter = Router();
UserRouter.route('/').get(UserController.getUsers);
UserRouter.route('/:id').get(UserController.getUserById);
UserRouter.route('/:id').delete(UserController.deleteUser);
UserRouter.route('/create').post(UserController.createUser);
UserRouter.route('/register').post(UserController.register);
UserRouter.route('/:id').put(UserController.updateUser);
UserRouter.route('/login').post(UserController.login);
UserRouter.route('/addcourse').post(UserController.addCourse);
UserRouter.route('/getcourses').get(UserController.getCourses);
UserRouter.route('updateperfil').put(UserController.updatePerfil);
export { UserRouter };
