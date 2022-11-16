
export interface CourseInterface {
  id?: number;
  name: string;
  theme: string;
  price: number;
}

export class Course implements CourseInterface{
  id?: number;
  name: string;
  theme: string;
  price: number;

  constructor(course: any){
    this.id = course.id;
    this.name = course.name;
    this.theme = course.theme;
    this.price = course.price;
  }
}