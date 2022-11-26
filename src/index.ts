require('dotenv').config();
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { CourseRouter } from './routes/CourseRoute';
import { UserRouter } from './routes/UserRouter';
import { auth } from './middlewares/authenticated';
import { errorHandler } from './middlewares/error-handler.middleware';

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(auth);

app.use('/user', UserRouter);
app.use('/course', CourseRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
