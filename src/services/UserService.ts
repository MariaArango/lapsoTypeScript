import { ResultSetHeader, RowDataPacket } from 'mysql2';
const bcryptjs = require('bcryptjs');
import { client } from '../repositories/mysql/sql-client';
import { User, UserInterface } from '../models/User';
import { UserSchema, UserSchemaInterface } from '../models/UserSchema';
import { jwtInterface } from '../models/jwtInterface';
const jwt = require('../services/jwt');

export class UserService {
  static async getUsers(): Promise<UserInterface[]> {
    try {
      const [results] = await client.query<RowDataPacket[]>(
        'select * from user'
      );

      return results.map((user) => new User(user));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getUsersById(idUser: Number): Promise<UserInterface> {
    try {
      const [result] = await client.query<RowDataPacket[]>(
        'select * from user where iduser =?',
        idUser
      );

      return new User(result[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteUser(idUser: Number): Promise<void> {
    try {
      await client.query<RowDataPacket[]>(
        'delete from user where iduser =?',
        idUser
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateUser(
    id: Number,
    user: UserSchemaInterface
  ): Promise<UserInterface> {
    try {
      await client.query<ResultSetHeader>(
        'update user set username = ?, email = ? where iduser = ?',
        [user.username, user.email, id]
      );

      return this.getUsersById(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async createUser(user: UserSchemaInterface): Promise<UserInterface> {
    try {
      const salt = bcryptjs.genSaltSync(10);
      user.password = await bcryptjs.hash(user.password, salt);

      const [result] = await client.query<ResultSetHeader>(
        'insert into user (username, email, password) values (?,?,?)',
        [user.username, user.email, user.password]
      );

      return this.getUsersById(result.insertId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  static async getUsersByEmail(email: string): Promise<UserSchemaInterface> {
    try {
      const [result] = await client.query<RowDataPacket[]>(
        'select * from user where email =?',
        email
      );
        console.log(result)
      return new UserSchema(result[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async login(email: string, password: string): Promise<jwtInterface> {
    try {
      console.log(email, password);
      // aca se busca el usuario por email
      const user =await this.getUsersByEmail(email);
      //si usuario no se encuentra se devuelve un error

      if (!user) throw { msg: 'error en el email o contraseña' };
      //se compara la contraseña
      const passwordSuccess = await bcryptjs.compare(password,user.password)

    
      // si no coincide se devuelve un error
      if (!passwordSuccess) throw { msg: '---error en el email o contraseña' };
      //si coincide se devuelve el token
      return { token: jwt.createToken(user, '12h') };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
