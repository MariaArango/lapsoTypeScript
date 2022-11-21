import { Request, Response } from 'express';
import { rol } from '../models/Rol';
import { UserSchema } from '../models/UserSchema';
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

  static async getUserById(req: Request, res: Response) {
    try {
      const idUser = Number(req.params.id);
      const data = await UserService.getUsersById(idUser);
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const idUser = Number(req.params.id);
      await UserService.deleteUser(idUser);
      res.status(204).json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      req.body;
      const idUser = Number(req.params.id);
      const user = req.body;
      const data = await UserService.updateUser(idUser, user);
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const user = new UserSchema(req.body);
      user.rol = rol.admin;
      const data = await UserService.createUser(user);
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  static async register(req: Request, res: Response) {
    try {
      const user = new UserSchema(req.body);
      user.rol = rol.user;
      const data = await UserService.createUser(user);
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const data = await UserService.login(email, password);
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async addCourse(req: Request, res: Response) {
    const { course } = req.body;
    const user = req.body.userlogued.id;
    try {
      const data = await UserService.addCourse(course, user);
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  static async getCourses(req: Request, res: Response) {
    const user = req.body.userlogued.id;
    console.log(user);
    try {
      const data = await UserService.getCourses(user);
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updatePerfil(req: Request, res: Response) {
    try {
      const idUser = req.body.userlogued.id;
      const user = req.body;
      const data = await UserService.updateUser(idUser, user);
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
