require('dotenv').config();
import express from 'express';

import { UserRouter } from './routes/UserRouter';
const { PORT } = process.env;
const app = express();

app.use('/user', UserRouter);

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
