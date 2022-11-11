import { Router } from "express";
import { CourseController } from "../controllers/CourseController";

const CourseRouter = Router();
CourseRouter.route('/').get(CourseController.getCourses);
CourseRouter.route('/:id').get(CourseController.getCourseById);
CourseRouter.route('/delete/:id').delete(CourseController.deleteCourse);


export {CourseRouter};