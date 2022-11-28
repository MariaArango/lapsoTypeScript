import { NextFunction, Request, Response } from 'express';
import { Course } from '../models/Course';

import { rol } from '../models/Rol';

import { CourseService } from '../services/CourseService';

export class CourseController {
  static async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const idCourse = Number(req.params.id);
      const data = await CourseService.getCourseById(idCourse);
      res.status(200).json(data);
    } catch (error: any) {
     next(error);
    }
  }

  static async deleteCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const user: rol = req.body.userlogued.rol;
      if (user !== rol.admin) {
        res.status(403).json({ msg: 'no tiene permiso de admnistrador' });
      } else {
        const idCourse = Number(req.params.id);
        await CourseService.deleteCourse(idCourse);
        res.status(204).json();
      }
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }

  static async updateCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const idCourse = Number(req.params.id);
      const course = req.body;
      const data = await CourseService.updateCourse(idCourse, course);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const course = new Course(req.body);
      const data = await CourseService.createCourse(course);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CourseService.getCourses(req);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }
}
