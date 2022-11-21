export interface CourseSchemaInterface {
  idcourse?: number;
  name: string;
  theme: string;
  price: number;
}

export class CourseSchema implements CourseSchemaInterface {
  idcourse?: number;
  name: string;
  theme: string;
  price: number;

  constructor(course: any) {
    this.idcourse = course.idcourse;
    this.name = course.name;
    this.theme = course.theme;
    this.price = course.price;
  }
}
