import jwt, { JsonWebTokenError, Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../models/unauthorized-error';

export const SECRET_KEY: Secret = 'H98DFADmdfadfe8987';

export const auth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const whiteList = ['/user/login', '/user/register', '/api-docs'];
    if (!whiteList.includes(req.originalUrl)) {
      if (!req.header('Authorization')) {
        throw new UnauthorizedError({
          name: 'authentication',
          message: 'la petición no tiene cabecera de Autenticación',
        });
      } else {
        const token = req.header('Authorization')?.replace('Bearer ', '') || '';
        const tokenDecode = jwt.verify(token, SECRET_KEY);
        req.body.userlogued = tokenDecode;
        next();
      }
    }
  } catch (error: any) {
    if (error instanceof JsonWebTokenError) {
      const jsonError = new UnauthorizedError({
        name: 'authentication',
        message: error.message,
      });
      next(jsonError);
    } else {
      next(error);
    }
  }
};
