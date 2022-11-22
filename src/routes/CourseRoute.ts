import { Router } from "express";
import { CourseController } from "../controllers/CourseController";

const CourseRouter = Router();
CourseRouter.route('/theme/:name').get(CourseController.getCourseByTheme);
CourseRouter.route('/ThemeAndPrice').get(CourseController.getCoursesByThemeAndPrice);
CourseRouter.route('/').get(CourseController.getCourses);
CourseRouter.route('/:id').get(CourseController.getCourseById);
CourseRouter.route('/:id').delete(CourseController.deleteCourse);
CourseRouter.route('/').post(CourseController.createCourse);
CourseRouter.route('/:id').put(CourseController.updateCourse);


export {CourseRouter};