"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSchema = void 0;
class CourseSchema {
    constructor(course) {
        this.idcourse = course.idcourse;
        this.name = course.name;
        this.theme = course.theme;
        this.price = course.price;
    }
}
exports.CourseSchema = CourseSchema;
