import { ResultSetHeader, RowDataPacket } from 'mysql2';
const bcryptjs = require('bcryptjs');
import { client } from '../repositories/mysql/sql-client';
import { User, UserInterface } from '../models/User';
import { UserSchema, UserSchemaInterface } from '../models/UserSchema';
import { jwtInterface } from '../models/jwtInterface';
import { Course, CourseInterface } from '../models/Course';
import { CustomError } from '../models/custom-error.model';
import { NotFoundError } from '../models/notfound-error';
import { UnauthorizedError } from '../models/unauthorized-error';

import * as jwt from '../utils/jwt';

export class UserService {
  static async getUsers(): Promise<UserInterface[]> {
    try {
      const [results] = await client.query<RowDataPacket[]>(
        'select * from user'
      );
      if (results.length === 0) {
        throw new NotFoundError({
          message: 'User Not Found',
          name: 'getUsersService',
        });
      }
      return results.map((user) => new User(user));
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al consultar usuarios',
          status: 500,
          name: 'getUsersService',
          customMessage: error.stack,
        });
      }
    }
  }

  static async getUsersById(idUser: Number): Promise<UserInterface> {
    try {
      const [result] = await client.query<RowDataPacket[]>(
        'select * from user where iduser =?',
        idUser
      );

      if (result.length === 0) {
        throw new NotFoundError({
          message: 'User Not Found',
          name: 'getUsersByIdService',
        });
      }
      return new User(result[0]);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al consultar usuario por id',
          status: 500,
          name: 'getUsersByIdService',
          customMessage: error.stack,
        });
      }
    }
  }

  static async deleteUser(idUser: Number): Promise<void> {
    try {
      await client.query<RowDataPacket[]>(
        'delete from user where iduser =?',
        idUser
      );
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al borrar usuario',
        status: 500,
        name: 'deleteUserService',
        customMessage: error.stack,
      });
    }
  }

  static async updateUser(
    id: number,
    user: UserSchemaInterface
  ): Promise<UserInterface> {
    try {
      await client.query<ResultSetHeader>(
        'update user set username = ?, email = ? where iduser = ?',
        [user.username, user.email, id]
      );
      if (!id) {
        throw new NotFoundError({
          message: 'User Not Found',
          name: 'updateUserService',
        });
      }
      return this.getUsersById(id);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al actualizar usuarios',
          status: 500,
          name: 'updateUserService',
          customMessage: error.stack,
        });
      }
    }
  }

  static async createUser(user: UserSchemaInterface): Promise<UserInterface> {
    try {
      const salt = bcryptjs.genSaltSync(10);
      user.password = await bcryptjs.hash(user.password, salt);

      const [result] = await client.query<ResultSetHeader>(
        'insert into user (username, email, password, rol) values (?,?,?,?)',
        [user.username, user.email, user.password, user.rol]
      );

      return this.getUsersById(result.insertId);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al crear usuarios',
        status: 500,
        name: 'createUsersService',
        customMessage: error.stack,
      });
    }
  }
  static async getUsersByEmail(email: string): Promise<UserSchemaInterface> {
    try {
      const [result] = await client.query<RowDataPacket[]>(
        'select * from user where email =?',
        email
      );

      return new UserSchema(result[0]);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error en la consulta de usuario por email',
        status: 500,
        name: 'getUserByEmailService',
        customMessage: error.stack,
      });
    }
  }

  static async login(email: string, password: string): Promise<jwtInterface> {
    try {
      // aca se busca el usuario por email
      const user = await this.getUsersByEmail(email);
      //si usuario no se encuentra se devuelve un error

      // se compara la contraseña
      const passwordSuccess = await bcryptjs.compare(password, user.password);

      // si no coincide se devuelve un error

      if (!passwordSuccess) {
        throw new UnauthorizedError({
          message: 'Error login',
          name: 'loginService',
        });
      }

      const userModel = new User(user);

      //si coincide se devuelve el token

      return { token: jwt.createToken(userModel, '12h') };
    } catch (error: any) {
      if (error instanceof UnauthorizedError) {
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al loguearse',
          status: 500,
          name: 'loginUserService',
          customMessage: error.stack,
        });
      }
    }
  }

  static async addCourse(course: number, user: number): Promise<boolean> {
    try {
      await client.query<ResultSetHeader>(
        'insert into learning (course, user) values (?,?)',
        [course, user]
      );
      return true;
    } catch (error: any) {
      if (error.message.includes('idcourse')) {
        throw new NotFoundError({
          message: 'Course Not found',
          name: 'addCourseService',
        });
      } else {
        throw new CustomError({
          message: 'Error al añadir curso al usuario registrado',
          status: 500,
          name: 'addCourseService',
          customMessage: error.stack,
        });
      }
    }
  }

  static async getCourses(id: number): Promise<CourseInterface[]> {
    try {
      const [results] = await client.query<RowDataPacket[]>(
        'select c.* from course c inner join learning l on c.idcourse = l.course where l.user = ?',
        id
      );
      if (results.length === 0) {
        throw new NotFoundError({
          message: 'User Not Found',
          name: 'getCoursesService',
        });
      }
      return results.map((course) => new Course(course));
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al consultar cursos',
          status: 500,
          name: 'getCoursesService',
          customMessage: error.stack,
        });
      }
    }
  }
}
