import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import serverless from 'serverless-http';

import routes from './routes';
import AppError from './errors/AppError';

// import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      title: err.title,
      description: err.description,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default serverless(app);
