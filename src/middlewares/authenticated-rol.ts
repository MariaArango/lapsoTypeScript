import { Request, Response, NextFunction } from 'express';
import { rol } from '../models/Rol';
import { ForbiddenError } from '../models/forbidden-error';


export const authRol = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const user: rol = req.body.userlogued.rol;
    if (user !== rol.admin) {
      throw new ForbiddenError({
        name: 'authRol',
        message: 'No tiene permiso de adminstrador',
      });
    }
    next();
  } catch (error: any) {
    next(error);
  }
};