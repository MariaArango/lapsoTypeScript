export interface UserInterface {
  id: number;
  username: string;
  email: string;
}

export class User implements UserInterface {
  id: number;
  username: string;
  email: string;
  constructor(user: any) {
    this.id = user.iduser;
    this.username = user.username;
    this.email = user.email;
  }
}

