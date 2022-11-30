import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../models/badrequest-error';
import { rol } from '../models/Rol';
import { UserSchema } from '../models/UserSchema';
import { UserService } from '../services/UserService';

export class UserController {
  static async getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.getUsers();
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const idUser = Number(req.params.id);
      if(!idUser){
        const error = new BadRequestError({
          message: 'Bad Request',
          name: 'getUserById'
        });
        next(error);
      }
      const data = await UserService.getUsersById(idUser);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async getUserPerfil(req: Request, res: Response, next: NextFunction) {
    try {
      const idUser = req.body.userlogued.id;
      console.log(req.body.userlogued);
      const data = await UserService.getUsersById(idUser);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const idUser = Number(req.params.id);
      await UserService.deleteUser(idUser);
      res.status(204).json();
    } catch (error: any) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      req.body;
      const idUser = Number(req.params.id);
      const user = req.body;
      const data = await UserService.updateUser(idUser, user);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = new UserSchema(req.body);
      user.rol = rol.admin;
      const data = await UserService.createUser(user);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = new UserSchema(req.body);
      user.rol = rol.user;
      const data = await UserService.createUser(user);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const data = await UserService.login(email, password);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async addCourse(req: Request, res: Response, next: NextFunction) {
    const { course } = req.body;
    const user = req.body.userlogued.id;
    try {
      const data = await UserService.addCourse(course, user);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }
  static async getCourses(req: Request, res: Response, next: NextFunction) {
    const user = req.body.userlogued.id;

    try {
      const data = await UserService.getCourses(user);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async updatePerfil(req: Request, res: Response, next: NextFunction) {
    try {
      const idUser = req.body.userlogued.id;
      const user = req.body;
      const data = await UserService.updateUser(idUser, user);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }
}
