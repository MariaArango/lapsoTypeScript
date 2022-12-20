import { Router } from 'express';
import { PurchaseController } from '../controllers/PurchaseController';

const PurchaseRouter = Router();

PurchaseRouter.route('/save').post(PurchaseController.savePurchase);
PurchaseRouter.route('/').get(PurchaseController.getPurchaseByUser);
PurchaseRouter.route('/:id').get(PurchaseController.getPurchaseById);

export { PurchaseRouter };
