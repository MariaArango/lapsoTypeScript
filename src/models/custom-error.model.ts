export interface CustomErrorInput {
  name: string,
  status: number,
  message: string
  }
  export class CustomError extends Error {
  name: string;
  status: number;
  constructor(customErrorInput: CustomErrorInput) {
  super(customErrorInput.message);
  this.name = customErrorInput.name;
  this.status = customErrorInput.status || 500;
  }
  toJson() {
  return {
  name: this.name,
  status: this.status,
  message: this.message,
  };
  }
  }