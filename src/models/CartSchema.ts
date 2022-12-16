export interface CartSchemaInterface {
  id: number;
  user: number;
  courses: string;

  setCourses(courses: number[]):void;

}

export class CartSchema implements CartSchemaInterface {
  id: number;
  user: number;
  courses: string;

  constructor(cart: any) {
    this.id = cart.idcart || 0;
    this.user = cart.user;
    this.courses = cart.courses;
    
  }

  setCourses(courses: number[]){
    this.courses = courses.toString();
  }

  // addCourse(courses: number[]){
  //   this.courses = courses.push();
  // }

 
}
