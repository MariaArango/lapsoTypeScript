import { Router } from "express";
import { CourseController } from "../controllers/CourseController";

const CourseRouter = Router();
CourseRouter.route('/').get(CourseController.getCourses);
CourseRouter.route('/:id').get(CourseController.getCourseById);
CourseRouter.route('/:id').delete(CourseController.deleteCourse);
CourseRouter.route('/').post(CourseController.createCourse);
CourseRouter.route('/:id').put(CourseController.updateCourse);
CourseRouter.route('/theme').get(CourseController.getCourseByTheme);

export {CourseRouter};