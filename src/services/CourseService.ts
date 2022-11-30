import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Request } from 'express';
import { Course, CourseInterface } from '../models/Course';
import { CourseSchemaInterface } from '../models/CourseSchema';
import { client } from '../repositories/mysql/sql-client';
import { CustomError } from '../models/custom-error.model';
import { NotFoundError } from '../models/notfound-error';
import { BadRequestError } from '../models/badrequest-error';

export class CourseService {
  static async getCourseById(idCourse: Number): Promise<CourseSchemaInterface> {
    try {
      const [result] = await client.query<RowDataPacket[]>(
        'select * from course where idcourse =?',
        idCourse
      );
      if (result.length === 0) {
        throw new NotFoundError({
          message: 'Course Not Found',
          name: 'getCourseById',
        });
      }
      return new Course(result[0]);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al buscar curso por id',
          status: 500,
          name: 'courseById',
          customMessage: error.stack,
        });
      }
    }
  }

  static async deleteCourse(idCourse: Number): Promise<void> {
    try {
      await client.query<RowDataPacket[]>(
        'delete from course where idcourse =?',
        idCourse
      );
    } catch (error: any) {
      throw new CustomError({
        message: 'Error al buscar borrar curso',
        status: 500,
        name: 'deleteCourse',
        customMessage: error.stack,
      });
    }
  }

  static async updateCourse(
    id: Number,
    course: CourseSchemaInterface
  ): Promise<CourseInterface> {
    try {
      if(!course.name || !course.theme || !course.price){
        throw new BadRequestError({
          message: 'Bad Request',
          name: 'updateCourse'
        })
      }
      await client.query<ResultSetHeader>(
        'update course set name =?, theme=?, price=? where idcourse =?',
        [course.name, course.theme, course.price, id]
      );
      if (!id) {
        throw new NotFoundError({
          message: 'Course Not Found',
          name: 'updateCourse',
        });
      }
      return this.getCourseById(id);
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } 
      if( error instanceof BadRequestError){
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al actualizar un curso',
          status: 500,
          name: 'updateCourse',
          customMessage: error.stack,
        });
      }
    }
  }

  static async createCourse(
    course: CourseSchemaInterface
  ): Promise<CourseInterface> {
    try {
      if (!course.name || !course.theme || !course.price) {
        throw new BadRequestError({
          message: 'Bad Request, sintaxis inválida',
          name: 'createCourse',
        });
      }
      const [result] = await client.query<ResultSetHeader>(
        'insert into course (name, theme, price) values (?,?,?)',
        [course.name, course.theme, course.price]
      );

      return this.getCourseById(result.insertId);
    } catch (error: any) {
      if (error instanceof BadRequestError) {
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al crear',
          status: 500,
          name: 'createCourse',
          customMessage: error.stack,
        });
      }
    }
  }

  static async getCourses(req: Request): Promise<CourseInterface[]> {
    try {
      let query = 'select * from course where 1=1';
      const params = [];
      if (req.query.theme) {
        query += ' and theme =?';
        params.push(req.query.theme);
      }
      if (req.query.pricemin) {
        query += ' and price >=?';
        params.push(req.query.pricemin);
      }
      if (req.query.pricemax) {
        query += ' and price <=?';
        params.push(req.query.pricemax);
      }
      if (req.query.name) {
        query += ' and name=?';
        params.push(req.query.name);
      }
      const [results] = await client.query<RowDataPacket[]>(query, params);

      if (results.length === 0) {
        throw new NotFoundError({
          message: 'Course Not Found',
          name: 'getCourses',
        });
      }
      return results.map((course) => new Course(course));
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new CustomError({
          message: 'Error al consultar cursos',
          status: 500,
          name: 'getCourses',
          customMessage: error.stack,
        });
      }
    }
  }
}
