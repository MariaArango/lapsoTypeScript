import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Request } from 'express';
import { Course, CourseInterface } from '../models/Course';
import { CourseSchemaInterface } from '../models/CourseSchema';
import { client } from '../repositories/mysql/sql-client';
import { CustomError } from '../models/custom-error.model';

export class CourseService {
  static async getCourseById(idCourse: Number): Promise<CourseSchemaInterface> {
    try {
      const [result] = await client.query<RowDataPacket[]>(
        'select * from course where idcourse =?',
        idCourse
      );
      return new Course(result[0]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async deleteCourse(idCourse: Number): Promise<void> {
    try {
      await client.query<RowDataPacket[]>(
        'delete from course where idcourse =?',
        idCourse
      );
    } catch (error: any) {
      console.log(error)
      throw new CustomError({
        message: 'Error al buscar borrar curso',
        status: 500,
        name: 'deleteCourse',
      });
    }
  }

  static async updateCourse(
    id: Number,
    course: CourseSchemaInterface
  ): Promise<CourseInterface> {
    try {
      await client.query<ResultSetHeader>(
        'update course set name =?, theme=?, price=? where idcourse =?',
        [course.name, course.theme, course.price, id]
      );
      return this.getCourseById(id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async createCourse(
    course: CourseSchemaInterface
  ): Promise<CourseInterface> {
    try {
      const [result] = await client.query<ResultSetHeader>(
        'insert into course (name, theme, price) values (?,?,?)',
        [course.name, course.theme, course.price]
      );
      return this.getCourseById(result.insertId);
    } catch (error: any) {
      throw new CustomError({message:'Error al crear',status:500,name:'createCourse'});
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
      if (req.query.price) {
        query += ' and price >?';
        params.push(req.query.price);
      }
      const [results] = await client.query<RowDataPacket[]>(query, params);

      return results.map((course) => new Course(course));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
