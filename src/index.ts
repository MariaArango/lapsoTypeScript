require('dotenv').config();
import express from 'express';
import { CourseRouter } from './routes/CourseRoute';
import { UserRouter } from './routes/UserRouter';
// import { auth } from './middlewares/authenticated';




const { PORT } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded());
// app.use(auth);

app.use('/user', UserRouter);
app.use('/course',CourseRouter);



app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
