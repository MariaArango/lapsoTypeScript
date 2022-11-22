"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const Course_1 = require("../models/Course");
const sql_client_1 = require("../repositories/mysql/sql-client");
class CourseService {
    static getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [results] = yield sql_client_1.client.query('select * from course');
                return results.map((course) => new Course_1.Course(course));
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getCourseById(idCourse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield sql_client_1.client.query('select * from course where idcourse =?', idCourse);
                return new Course_1.Course(result[0]);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static deleteCourse(idCourse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sql_client_1.client.query('delete from course where idcourse =?', idCourse);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static updateCourse(id, course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield sql_client_1.client.query('update course set name =?, theme=?, price=? where idcourse =?', [course.name, course.theme, course.price, id]);
                return this.getCourseById(id);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static createCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [result] = yield sql_client_1.client.query('insert into course (name, theme, price) values (?,?,?)', [course.name, course.theme, course.price]);
                return this.getCourseById(result.insertId);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    //método para buscar cursos por themes
    static getCourseByTheme(theme) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            console.log(theme);
            //     const [results] = await client.query<RowDataPacket[]>(
            //       'select * from course where theme = ?',
            //       theme
            //     );
            //     console.log(results)
            //     return results.map((course)=> new Course(course));
            //   } catch (error: any) {
            //     throw new Error(error.message);
            //   }
        });
    }
}
exports.CourseService = CourseService;
