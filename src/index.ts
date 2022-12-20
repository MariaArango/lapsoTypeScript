require('dotenv').config();
import express from 'express';
import sessions from 'express-session';
import swaggerUi from 'swagger-ui-express';
import { parse  } from 'yaml';
import { readFileSync } from 'fs'
import { CourseRouter } from './routes/CourseRoute';
import { UserRouter } from './routes/UserRouter';
import { auth } from './middlewares/authenticated';
import { errorHandler } from './middlewares/error-handler.middleware';
import { CartRouter } from './routes/CartRoute';
import { PurchaseRouter } from './routes/PurchaseRoute';


const { PORT } = process.env;
const app = express();
const swaggerYaml = readFileSync('./swagger.yaml','utf8');
const swaggerDocument = parse(swaggerYaml);

// para guardar el carrito en sesión
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: "thisismysecretkeyfadfadfadff",
  saveUninitialized: true,
  cookie: {maxAge: oneDay},
  resave: false
}));

app.use(express.json());
app.use(express.urlencoded());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(auth);


app.use('/user', UserRouter);
app.use('/course', CourseRouter);
app.use('/cart',CartRouter);
app.use('/purchase',PurchaseRouter);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
