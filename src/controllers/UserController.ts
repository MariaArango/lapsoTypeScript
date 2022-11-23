import { Request, Response } from 'express';
import { rol } from '../models/Rol';
import { UserSchema } from '../models/UserSchema';
import { UserService } from '../services/UserService';
import { CustomError } from '../models/custom-error.model';

export class UserController {
  static async getUsers(_req: Request, res: Response) {
    try {
      const data = await UserService.getUsers();
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al consultar usuarios',
        status: 500,
        name: 'getUsers',
      });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const idUser = Number(req.params.id);
      const data = await UserService.getUsersById(idUser);
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al consultar usuario por id',
        status: 500,
        name: 'getUsersById',
      });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const idUser = Number(req.params.id);
      await UserService.deleteUser(idUser);
      res.status(204).json();
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al borrar usuario',
        status: 500,
        name: 'deleteUser',
      });
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
      throw new CustomError({
        message: 'Error al actualizar usuarios',
        status: 500,
        name: 'updateUsers',
      });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const user = new UserSchema(req.body);
      user.rol = rol.admin;
      const data = await UserService.createUser(user);
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al crear usuarios',
        status: 500,
        name: 'createUsers',
      });
    }
  }
  static async register(req: Request, res: Response) {
    try {
      const user = new UserSchema(req.body);
      user.rol = rol.user;
      const data = await UserService.createUser(user);
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al registrarse',
        status: 500,
        name: 'registerUsers',
      });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const data = await UserService.login(email, password);
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al loguearse',
        status: 500,
        name: 'loginUsers',
      });
    }
  }

  static async addCourse(req: Request, res: Response) {
    const { course } = req.body;
    const user = req.body.userlogued.id;
    try {
      const data = await UserService.addCourse(course, user);
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al añadir curso al usuario registrado',
        status: 500,
        name: 'addCourse',
      });
    }
  }
  static async getCourses(req: Request, res: Response) {
    const user = req.body.userlogued.id;

    try {
      const data = await UserService.getCourses(user);
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al consultar cursos',
        status: 500,
        name: 'getCourses',
      });
    }
  }

  static async updatePerfil(req: Request, res: Response) {
    try {
      const idUser = req.body.userlogued.id;
      const user = req.body;
      const data = await UserService.updateUser(idUser, user);
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al actualizar los datos del usuario registrado',
        status: 500,
        name: 'updatePerfil',
      });
    }
  }
}
