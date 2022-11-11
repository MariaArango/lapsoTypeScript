import { client } from '../repositories/mysql/sql-client';
import { User, UserInterface } from '../models/User';
import { RowDataPacket } from 'mysql2';

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
      const [result] = await client.query<RowDataPacket[]>(
        'delete from user where iduser =?',
        idUser
      );
      console.log(result);
      
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // static async updateUser(idUser:Number):Promise<UserInterface>{
  //   try {
  //     const[result] = await client.query<RowDataPacket[]>(
  //       'update user set email =?, username = ?'
  //     )
  //   } catch (error: any) {
  //     throw new Error(error.message);
  //   }
  // }

  static async createUser(user: UserInterface): Promise<UserInterface> {
    try {
      const newUser = await client.query<RowDataPacket[]>(
        'insert into user (username, email) values (?,?)',
        [user.username, user.email]
      );
      console.log(newUser);
      return new User(newUser);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
