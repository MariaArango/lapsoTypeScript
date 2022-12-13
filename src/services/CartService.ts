import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Cart, CartInterface } from '../models/Cart';
import { CustomError } from '../models/custom-error.model';
import { NotFoundError } from '../models/notfound-error';
import { client } from '../repositories/mysql/sql-client';

export class CartService {
  static async addCourseCart(courses: string, user: number): Promise<boolean> {
    try {
      
      await client.query<ResultSetHeader>(
        'insert into cart (courses,user) values (?,?)',
        [courses, user]
      );
      return true;
    } catch (error: any) {
      if (error.message.includes('idcourse')) {
        throw new NotFoundError({
          message: 'Course Not found',
          name: 'addCourseCartService',
        });
      } else {
        throw new CustomError({
          message: 'Error al añadir curso al usuario registrado',
          status: 500,
          name: 'addCourseCartService',
          customMessage: error.stack,
        });
      }
    }
  }

  static async getCartById(idCart:number):Promise<CartInterface>{
    try {
        const [result] = await client.query<RowDataPacket[]>(
          'select * from cart where idcart =?',
          idCart
        );
        if (result.length === 0) {
          throw new NotFoundError({
            message: 'Cart Not Found',
            name: 'getCartByIdService',
          });
        }
        return new Cart(result[0]);
        
    } catch (error:any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al consultar cart por id',
          status: 500,
          name: 'getCartByIdService',
          customMessage: error.stack,
        });
      }
    }
  }

  static async getCartByUser(user: number): Promise<CartInterface>{
    try {
      const[result] = await client.query<RowDataPacket[]>(
        'select * from cart where user=?',
        user
      );
      if (result.length === 0) {
        throw new NotFoundError({
          message: 'Cart Not Found',
          name: 'getCartByUserService',
        });
      }
      return new Cart(result[0]);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al consultar cart por user',
          status: 500,
          name: 'getCartByUserService',
          customMessage: error.stack,
        });
      }
      
    }
  }
}
