import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Cart, CartInterface } from '../models/Cart';
import { CartSchema, CartSchemaInterface } from '../models/CartSchema';
import { CustomError } from '../models/custom-error.model';
import { NotFoundError } from '../models/notfound-error';
import { client } from '../repositories/mysql/sql-client';

export class CartService {
  static async addCourseCart(
    course: number,
    user: number
  ): Promise<CartInterface> {
    try {
      const cartSchema = await this.cartByUser(user);
      const cart = new Cart(cartSchema);
      //comprobamos si el curso esta incluido en los cursos del usuario
      if (!cart.courses.includes(course)) {
        //tenemos que controlar que el curso exista

        cart.courses.push(course);
        const cartFilter = cart.courses.filter((c) => c !== 0);
        cartSchema.setCourses(cartFilter);

        await client.query<ResultSetHeader>(
          'update cart set courses = ? where idcart = ?',
          [cartSchema.courses, cartSchema.id]
        );
      }
      return this.getCartById(cartSchema.id);
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

  static async getCartById(idCart: number): Promise<CartInterface> {
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
    } catch (error: any) {
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

  static async cartByUser(user: number): Promise<CartSchemaInterface> {
    try {
      const [result] = await client.query<RowDataPacket[]>(
        'select * from cart where user=?',
        user
      );
      if (result.length === 0) {
        throw new NotFoundError({
          message: 'Cart Not Found',
          name: 'getCartByUserService',
        });
      }
      return new CartSchema(result[0]);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        //si el usuario no tiene carrito se crea uno nuevo vacio para ese usuario
        await client.query<ResultSetHeader>(
          'insert into cart (user,courses) values(?,?)',
          [user, '']
        );
        return this.cartByUser(user);
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

  static async deleteCourseCart(course: number, user: number): Promise<void> {
    const cartSchema = await this.cartByUser(user);
    const cart = new Cart(cartSchema);
    try {
      //buscamos el curso para borrarlo
      const cartFilter = cart.courses.filter((c) => c !== course);

      //actualizamos los cursos para borrar el curso elegido
      cartSchema.setCourses(cartFilter);
      await client.query<ResultSetHeader>(
        'update cart set courses = ? where user = ?',
        [cartSchema.courses, cartSchema.user]
      );
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al borrar curso del carrito',
        status: 500,
        name: 'deleteCourseCartService',
        customMessage: error.stack,
      });
    }
  }

  static async cleanCart(user: number): Promise<void> {
    const cartSchema = await this.cartByUser(user);
    const cart = new Cart(cartSchema);

    try {
      cart.courses = [];
      cartSchema.setCourses(cart.courses);
      await client.query<ResultSetHeader>(
        'update cart set courses = ? where user = ?',
        [cartSchema.courses, cartSchema.user]
      );
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al vaciar carrito',
        status: 500,
        name: 'cleanCartService',
        customMessage: error.stack,
      });
    }
  }
}
