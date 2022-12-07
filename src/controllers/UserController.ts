import { Request, Response, NextFunction } from 'express';
import { Validator } from 'jsonschema';
import { BadRequestError } from '../models/badrequest-error';
import { rol } from '../models/Rol';
import { UserSchema } from '../models/UserSchema';
import { UserService } from '../services/UserService';
import { loginSchema, userSchema } from '../models/Validator-json';
const v = new Validator();

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
      const validationResult = v.validate(idUser, { type: 'number' });
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'getUserByIdController',
        });
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
      const validationResult = v.validate(user, userSchema);
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'updateUserController',
        });
      }
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
      const validationResult = v.validate(user, userSchema);
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'createUserController',
        });
      }
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
      const validationResult = v.validate(user, userSchema);
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'registerController,la contraseña debe tener entre 8 y 16 caracteres digitos, mayusculas y minusculas',
        });
      }
      const data = await UserService.createUser(user);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const {email, password} = req.body
    const validationResult = v.validate({email,password}, loginSchema);
      console.log(validationResult)
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'registerController',
        });
      }
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
      const validationResult = v.validate(course, { type: 'number' });
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'addCourseController',
        });
      }
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
      const validationResult = v.validate(user, userSchema);
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'updateperfilController',
        });
      }
      const data = await UserService.updateUser(idUser, user);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }
}
