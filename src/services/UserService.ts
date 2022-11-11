import { client } from '../repositories/mysql/sql-client';
import { User, UserInterface } from '../models/User';
import { OkPacket, RowDataPacket } from 'mysql2';

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
      console.log(result);
      return new User(result[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteUser(idUser:Number):Promise<UserInterface>{
    try {
      const [result] = await client.query<RowDataPacket[]>(
        'delete * from user where iduser =?',idUser
      );
      console.log('usuario borrado');
      
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async createUser(user: UserInterface): Promise<UserInterface> {
    try {
      const newUser = await client.query<RowDataPacket[]>(
        'insert into user (username, email) values (?,?)',
        user
      );
      console.log(newUser);
      return new User(newUser);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

 
}
