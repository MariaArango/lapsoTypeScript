import { Request, Response, NextFunction } from 'express';
import { rol } from '../models/Rol';

export const authRol = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: rol = req.body.userlogued.rol;
  try {
    if (user !== rol.admin) {
      res.status(403).json({ msg: 'no tiene permiso de administrador' });
    }else{
        res.status(200);
    }
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};
