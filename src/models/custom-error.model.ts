export class CustomError extends Error {
  name: string;
  status: number;
  customMessage: string;

  constructor(customErrorInput: CustomErrorInput) {
    super(customErrorInput.message);
    this.name = customErrorInput.name;
    this.customMessage = customErrorInput.customMessage;
    this.status = customErrorInput.status || 500;
  }

  toJson() {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
      customMessage: this.customMessage,
    };
  }
}

export interface CustomErrorInput {
  name: string;
  status: number;
  customMessage: string;
  message: string;
}