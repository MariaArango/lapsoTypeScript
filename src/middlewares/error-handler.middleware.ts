import { Response, NextFunction } from 'express';

export function errorHandler(err: any, res: Response) {
  res.status(500).json({
    status: 'error',
    name: err.message,
    message: err.message,
  });
}
export function customErrorHandler(
  err: any,

  res: Response,
  next: NextFunction
) {
  if (err.toJson && typeof err.toJson === 'function') {
    res.status(err.status).json(err.toJson());
  } else {
    res.status(500).json({
      status: 'error',
      name: err.message,
      message: err.message,
      path: err.path,
    });
  }
  next();
}
