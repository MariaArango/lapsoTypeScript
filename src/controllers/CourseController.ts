import { Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course';
import { Validator } from 'jsonschema';
import { CourseService } from '../services/CourseService';
import { BadRequestError } from '../models/badrequest-error';
import { courseSchema } from '../models/Validator-json';

const v = new Validator();

export class CourseController {

  static async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const idCourse = Number(req.params.id);
      const validationResult = v.validate(idCourse, { type: 'number' });
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'getCourseById',
        });
      }
      const data = await CourseService.getCourseById(idCourse);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async deleteCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const idCourse = Number(req.params.id);
      await CourseService.deleteCourse(idCourse);
      res.status(204).json();
    } catch (error: any) {
      next(error);
    }
  }

  static async updateCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const idCourse = Number(req.params.id);
      const course = req.body;
      const validationResult = v.validate(course,courseSchema);
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'updateCourseController',
        });
      }
      const data = await CourseService.updateCourse(idCourse, course);
      res.status(200).json(data);
    } catch (error: any) {
      next(error);
    }
  }

  static async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const course = new Course(req.body);
      const validationResult = v.validate(course,courseSchema);
      if (validationResult.errors.length > 0) {
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'createCourseController',
        });
      }
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
