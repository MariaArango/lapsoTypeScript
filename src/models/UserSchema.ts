import { rol } from "./Rol";

export interface UserSchemaInterface {
  iduser?: number;
  username: string;
  email: string;
  password?: string;
  rol: rol;
}

export class UserSchema implements UserSchemaInterface {
  iduser?: number;
  username: string;
  email: string;
  password?: string;
  rol:rol;
  constructor(user: any) {
    this.iduser = user.iduser;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.rol= user.rol;
  }
}
