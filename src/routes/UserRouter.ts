import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authRol } from '../middlewares/authenticated-rol';


const UserRouter = Router();
UserRouter.route('/getcourses').get(UserController.getCourses);
UserRouter.route('/login').post(UserController.login);
UserRouter.route('/addcourse').post(UserController.addCourse);
UserRouter.route('/updateperfil').put(UserController.updatePerfil);
UserRouter.route('/create').post([authRol],UserController.createUser);
UserRouter.route('/register').post(UserController.register);
UserRouter.route('/').get(UserController.getUsers);
UserRouter.route('/:id').get(UserController.getUserById);
UserRouter.route('/:id').delete([authRol],UserController.deleteUser);
UserRouter.route('/:id').put([authRol],UserController.updateUser);

export { UserRouter };
