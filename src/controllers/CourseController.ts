import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { CustomError } from '../models/custom-error.model';
import { rol } from '../models/Rol';

import { CourseService } from '../services/CourseService';

export class CourseController {
  static async getCourseById(req: Request, res: Response) {
    try {
      const idCourse = Number(req.params.id);
      const data = await CourseService.getCourseById(idCourse);
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al buscar curso por id',
        status: 500,
        name: 'courseById',
      });
    }
  }

  static async deleteCourse(req: Request, res: Response) {
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
      throw new CustomError({
        message: 'Error al buscar borrar curso',
        status: 500,
        name: 'deleteCourse',
      });
    }
  }

  static async updateCourse(req: Request, res: Response) {
    try {
      const idCourse = Number(req.params.id);
      const course = req.body;
      const data = await CourseService.updateCourse(idCourse, course);
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al actualizar un curso',
        status: 500,
        name: 'updateCourse',
      });
    }
  }

  static async createCourse(req: Request, res: Response) {
    try {
      const course = new Course(req.body);
      const data = await CourseService.createCourse(course);
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al crear un curso',
        status: 500,
        name: 'createCourse',
      });
    }
  }

  static async getCourses(req: Request, res: Response) {
    try {
      const data = await CourseService.getCourses(req);
      res.status(200).json(data);
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al consultar cursos',
        status: 500,
        name: 'getCourses',
      });
    }
  }
}
