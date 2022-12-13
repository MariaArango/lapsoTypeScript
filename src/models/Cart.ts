export interface CartInterface {
  id: number;
  user: number;
  courses: string;
  // courses: Array<number>;

}

export class Cart implements CartInterface {
  id: number;
  user: number;
  courses: string;
  // courses: Array<number>;
  constructor(cart: any) {
    this.id = cart.idcart || 0;
    this.user = cart.user;
    this.courses = cart.courses;
    // this.courses = cart.courses;
  }
}
