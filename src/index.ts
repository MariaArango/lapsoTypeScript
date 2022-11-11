require('dotenv').config();
import express from 'express';
import { CourseRouter } from './routes/CourseRoute';
import { UserRouter } from './routes/UserRouter';

const bp = require('body-parser')


const { PORT } = process.env;
const app = express();

app.use('/user', UserRouter);
app.use('/course',CourseRouter);

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
