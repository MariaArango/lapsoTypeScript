import { Request, Response, NextFunction } from 'express';
import { Validator } from 'jsonschema';
import { BadRequestError } from '../models/badrequest-error';

import { CartService } from '../services/CartService';
const v = new Validator();

export class CartController {
  static async addCourseCart(req: Request, res: Response, next: NextFunction) {
    const { course } = req.body;
    const user = req.body.userlogued.id;

    try {
      const validationResult = v.validate(course, { type: 'number' });
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'addCourseCartController',
        });
      }
      const data = await CartService.addCourseCart(course, user);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async getCartById(req: Request, res: Response, next: NextFunction) {
    try {
      const idCart = Number(req.params.id);
      const validationResult = v.validate(idCart, { type: 'number' });
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'getCartByIdController',
        });
      }
      const cart = await CartService.getCartById(idCart);
      res.status(200).json(cart);
    } catch (error: any) {
      next(error);
    }
  }

  static async cartByUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = Number(req.params.id);
      const validationResult = v.validate(user, { type: 'number' });
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'getCartByUserController',
        });
      }
      const cart = await CartService.cartByUser(user);
      res.status(200).json(cart);
    } catch (error: any) {
      next(error);
    }
  }

  static async deleteCourseCart(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.body.userlogued.id;
      const { course } = req.body;
      const validationResult = v.validate(course, { type: 'number' });
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'deleteCourseCartController',
        });
      }
      await CartService.deleteCourseCart(course, user);
      res.status(204).json();
    } catch (error: any) {
      next(error);
    }
  }

  static async cleanCart(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body.userlogued.id;
      const validationResult = v.validate(user, { type: 'number' });
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'cleanCartController',
        });
      }
      await CartService.cleanCart(user);
      res.status(200).json({ msg: 'carrito vaciado' });
    } catch (error: any) {
      next(error);
    }
  }
}
