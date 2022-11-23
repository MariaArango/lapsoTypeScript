import { Router } from "express";
import { CourseController } from "../controllers/CourseController";
import { authRol } from "../middlewares/authenticated-rol";

const CourseRouter = Router();
CourseRouter.route('/').get(CourseController.getCourses);
CourseRouter.route('/:id').get(CourseController.getCourseById);
CourseRouter.route('/:id').delete([authRol],CourseController.deleteCourse);
CourseRouter.route('/').post([authRol],CourseController.createCourse);
CourseRouter.route('/:id').put([authRol],CourseController.updateCourse);


export {CourseRouter};