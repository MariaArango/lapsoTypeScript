import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  _req: Request,
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

  next(err);
}
