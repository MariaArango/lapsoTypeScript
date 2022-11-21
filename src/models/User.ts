import { rol } from "./Rol";


export interface UserInterface {
  id: number;
  username: string;
  email: string;
  rol: rol;
}

export class User implements UserInterface {
  id: number;
  username: string;
  email: string;
  rol:rol;
  constructor(user: any) {
    this.id = user.iduser || 0;
    this.username = user.username;
    this.email = user.email;
    this.rol = user.rol;
  }
}
