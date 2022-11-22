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
exports.CourseController = void 0;
const Course_1 = require("../models/Course");
const CourseService_1 = require("../services/CourseService");
class CourseController {
    static getCourses(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield CourseService_1.CourseService.getCourses();
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getCourseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idCourse = Number(req.params.id);
                const data = yield CourseService_1.CourseService.getCourseById(idCourse);
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idCourse = Number(req.params.id);
                yield CourseService_1.CourseService.deleteCourse(idCourse);
                res.status(204).json();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idCourse = Number(req.params.id);
                const course = req.body;
                const data = yield CourseService_1.CourseService.updateCourse(idCourse, course);
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const course = new Course_1.Course(req.body);
                const data = yield CourseService_1.CourseService.createCourse(course);
                res.status(200).json(data);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getCourseByTheme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('hola');
                const theme = req.params.name;
                const data = yield CourseService_1.CourseService.getCourseByTheme(theme);
                console.log(theme);
                console.log(data);
                res.status(200).json({});
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.CourseController = CourseController;
