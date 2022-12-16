import { RowDataPacket } from "mysql2";
import { CartSchemaInterface } from "./CartSchema";

export interface CartInterface {
  id: number;
  user: number;
  courses: number[];

}

export class Cart implements CartInterface {
  id: number;
  user: number;
  courses: number[];
  constructor(cart: CartSchemaInterface | RowDataPacket) {
    this.id = cart.id;
    this.user = cart.user;
    this.courses = cart.courses.split(',').map((course: string) => Number(course));
  }
}
