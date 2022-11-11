import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  static async getUsers(_req: Request, res: Response) {
    try {
      const data = await UserService.getUsers();
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getUserById(req:Request,res: Response){
    try {
        const idUser = Number(req.params.id);
        const data = await UserService.getUsersById(idUser);
        res.status(200).json(data);
    } catch (error: any) {
        throw new Error(error.message);
    }
  }
}
