import { Request, Response } from 'express';
import { Course } from '../models/Course';
import { CourseService } from '../services/CourseService';

export class CourseController {
  static async getCourses(_req: Request, res: Response) {
    try {
      const data = await CourseService.getCourses();
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getCourseById(req: Request, res: Response) {
    try {
      const idCourse = Number(req.params.id);
      const data = await CourseService.getCourseById(idCourse);
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteCourse(req: Request, res: Response) {
    try {
      const idCourse = Number(req.params.id);
      await CourseService.deleteCourse(idCourse);
      res.status(204).json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async updateCourse(req: Request, res: Response){
    try {
      const idCourse = Number(req.params.id);
      const course = req.body;
      const data = await CourseService.updateCourse(idCourse, course);
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  static async createCourse(req: Request, res: Response) {
    try {
      const course = new Course(req.body);
      const data = await CourseService.createCourse(course);
      res.status(200).json(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
