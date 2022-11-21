import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = 'H98DFADmdfadfe8987';

const whiteList = ['/user/login', '/user/register'];

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!whiteList.includes(req.originalUrl)) {
      if (!req.header('Authorization')) {
        res
          .status(401)
          .json({ msg: 'la petición no tiene cabecera de Autenticación' });
      } else {
        const token = req.header('Authorization')?.replace('Bearer ', '') || '';
        const tokenDecode = jwt.verify(token, SECRET_KEY);
     
        req.body.userlogued = tokenDecode;
        next();
      }
    } else {
      next();
    }
  } catch (err) {
    res.status(400).json({ msg: 'token invalido' });
  }
};
