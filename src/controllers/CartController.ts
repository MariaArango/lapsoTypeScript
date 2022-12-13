import { Request, Response, NextFunction } from 'express';
import { Validator } from 'jsonschema';
import { BadRequestError } from '../models/badrequest-error';
import { CartService } from '../services/CartService';
const v = new Validator();

export class CartController {
  static async addCourseCart(req: Request, res: Response, next: NextFunction) {
    const { courses } = req.body;
    const user = req.body.userlogued.id;
    
    try {
      const validationResult = v.validate(courses, { type: 'string' });
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'addCourseCartController',
        });
      }
      //comrpobamos si el user tiene ya idcart
      
        // const cart = CartService.getCartByUser(user);
        // if(cart===null || undefined){
          const data = await CartService.addCourseCart(courses, user);
          res.status(200).json(data);
          console.log(data)
        // } else {
          
        //   console.log('ya tiene carrito asignado')
        // }
      
    //  next()
    } catch (error: any) {
      next(error);
    }
  }

  static async getCartById(req: Request,res: Response,next:NextFunction){
    try {
      const idCart = Number(req.params.id);
      const validationResult = v.validate(idCart,{type: 'number'});
      if(validationResult.errors.length>0){
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'getCartByIdController'
        });
      }
      const cart = await CartService.getCartById(idCart);
      
      res.status(200).json(cart);
    } catch (error: any) {
      next(error);
      
    }
  }

  static async getCartByUser(req: Request, res: Response, next: NextFunction){
    try {
      const user = Number(req.params.id);
      const validationResult = v.validate(user, {type: 'number'});
      if(validationResult.errors.length>0){
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'getCartByUserController'
        });
      }
      const cart = await CartService.getCartByUser(user);
      res.status(200).json(cart);
    } catch (error: any) {
      next(error);
    }
  }
}
