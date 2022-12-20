import { Request, Response, NextFunction } from 'express';
import { Validator } from 'jsonschema';
import { BadRequestError } from '../models/badrequest-error';
import { PurchaseService } from '../services/PurchaseService';

const v = new Validator();

export class PurchaseController {
  static async savePurchase(req: Request, res: Response, next: NextFunction) {
    const user = req.body.userlogued.id;

    try {
      const data = await PurchaseService.savePurchase(user);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async getPurchaseByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.body.userlogued.id;
      const purchase = await PurchaseService.getPurchaseByUser(user);
      res.status(200).json(purchase);
    } catch (error: any) {
      next(error);
    }
  }

  static async getPurchaseById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const idPurchase = Number(req.params.id);
      const validationResult = v.validate(idPurchase, { type: 'number' });
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'getPurchaseById',
        });
      }
      const data = await PurchaseService.getPurchaseById(idPurchase);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }
}
