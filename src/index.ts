require('dotenv').config();
import express from 'express';
import { CourseRouter } from './routes/CourseRoute';
import { UserRouter } from './routes/UserRouter';




const { PORT } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded());


app.use('/user', UserRouter);
app.use('/course',CourseRouter);



app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
