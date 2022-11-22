"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const CourseRoute_1 = require("./routes/CourseRoute");
const UserRouter_1 = require("./routes/UserRouter");
// import { auth } from './middlewares/authenticated';
const error_handler_middleware_1 = __importDefault(require("./middlewares/error-handler.middleware"));
const { PORT } = process.env;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// app.use(auth);
app.use('/user', UserRouter_1.UserRouter);
app.use('/course', CourseRoute_1.CourseRouter);
app.use(error_handler_middleware_1.default);
app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
});
