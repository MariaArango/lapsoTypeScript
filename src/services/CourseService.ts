import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Course, CourseInterface } from '../models/Course';
import { CourseSchemaInterface } from '../models/CourseSchema';
import { client } from '../repositories/mysql/sql-client';

export class CourseService {
  static async getCourses(): Promise<CourseInterface[]> {
    try {
      const [results] = await client.query<RowDataPacket[]>(
        'select * from course'
      );
      return results.map((course) => new Course(course));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

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
      throw new Error(error.message);
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

  static async createCourse(course: CourseSchemaInterface): Promise<CourseInterface> {
    try {
      const [result] = await client.query<ResultSetHeader>(
        'insert into course (name, theme, price) values (?,?,?)',
        [course.name, course.theme, course.price]
      );
      return this.getCourseById(result.insertId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
