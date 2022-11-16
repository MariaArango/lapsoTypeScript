import { JwtPayload } from 'jsonwebtoken';

export interface jwtInterface {
  token: string | JwtPayload;
}
