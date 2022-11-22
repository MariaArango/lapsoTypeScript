"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
class Course {
    constructor(course) {
        this.id = course.id;
        this.name = course.name;
        this.theme = course.theme;
        this.price = course.price;
    }
}
exports.Course = Course;
