import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { CustomError } from '../models/custom-error.model';
import { NotFoundError } from '../models/notfound-error';
import { Purchase } from '../models/Purchase';
import {
  PurchaseSchema,
  PurchaseSchemaInterface,
} from '../models/PurchaseSchema';
import { client } from '../repositories/mysql/sql-client';
import { CartService } from './CartService';

export class PurchaseService {
  static async savePurchase(user: number): Promise<PurchaseSchemaInterface> {
    try {
      const cartUser = await CartService.cartByUser(user);
      const courses = cartUser.courses;
      const date = new Date(Date.now());
      const total = await this.getTotal(courses);
      console.log({ user, courses, date, total });
      const [result] = await client.query<ResultSetHeader>(
        'insert into purchase (user,courses,date,total) values (?,?,?,?)',
        [user, courses, date, total]
      );

      return this.getPurchaseById(result.insertId);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al guardar el carrito',
        status: 500,
        name: 'saveCartService',
        customMessage: error.stack,
      });
    }
  }
  static async getTotal(courses: string) {
    const [result] = await client.query<RowDataPacket[]>(
      `SELECT SUM(price) AS total FROM course where idcourse IN (${courses})`
    );
    return result[0].total || 0;
  }

  static async getPurchaseByUser(
    user: number
  ): Promise<PurchaseSchemaInterface> {
    try {
      const [result] = await client.query<RowDataPacket[]>(
        'select * from purchase where user =?',
        user
      );
      if (result.length === 0) {
        throw new NotFoundError({
          message: 'Purchase Not Found',
          name: 'getPurchaseByUserService',
        });
      }
      return new PurchaseSchema(result[0]);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al buscar compra por user',
        status: 500,
        name: 'getPurchaseByUserService',
        customMessage: error.stack,
      });
    }
  }

  static async getPurchaseById(
    idPurchase: number
  ): Promise<PurchaseSchemaInterface> {
    try {
      const [result] = await client.query<RowDataPacket[]>(
        'select * from purchase where idpurchase =?',
        idPurchase
      );
      if (result.length === 0) {
        throw new NotFoundError({
          message: 'Purchase Not Found',
          name: 'getPurchaseByIdService',
        });
      }
      console.log(result[0]);
      return new Purchase(result[0]);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al buscar purchase por id',
          status: 500,
          name: ' getPurchaseByIdService',
          customMessage: error.stack,
        });
      }
    }
  }
}
