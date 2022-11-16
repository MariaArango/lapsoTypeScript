export interface UserSchemaInterface {
  id?: number;
  username: string;
  email: string;
  password?: string;
}

export class UserSchema implements UserSchemaInterface {
  id?: number;
  username: string;
  email: string;
  password?: string;
  constructor(user: any) {
    this.id = user.iduser;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
  }
}
