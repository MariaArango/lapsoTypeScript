import { Router } from 'express';
import { CartController } from '../controllers/CartController';


const CartRouter = Router();

CartRouter.route('/add').post(CartController.addCourseCart);
CartRouter.route('/:id').get(CartController.getCartById);
CartRouter.route('/user/:id').get(CartController.getCartByUser);

export { CartRouter };
