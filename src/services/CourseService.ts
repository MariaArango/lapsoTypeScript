import { RowDataPacket } from "mysql2";
import { Course,CourseInterface } from "../models/Course";
import { client } from "../repositories/mysql/sql-client";


export class CourseService {

static async getCourses():Promise<CourseInterface[]>{
    try {
        const [results] = await client.query<RowDataPacket[]>(
            'select * from course'
        );
        return results.map((course) =>new Course(course));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

static async getCourseById(idCourse:Number): Promise<CourseInterface> {
    try {
        const [result] = await client.query<RowDataPacket[]>(
            'select * from course where idcourse =?',idCourse
        );
        return new Course(result[0]);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

static async deleteCourse(idCourse:Number):Promise<void>{
    try {
        const[result] = await client.query<RowDataPacket[]>(
            'delete from course where idcourse =?',idCourse
        );
        console.log(result);
    } catch (error: any) {
        throw new Error(error.message);
    }
}





}