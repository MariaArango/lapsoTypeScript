export class BadRequestError extends Error {
  name: string;
  status: number;

  constructor(badrequestErrorInput: BadRequestErrorInput) {
    super(badrequestErrorInput.message);
    this.name = badrequestErrorInput.name;
    this.status = 400;
  }

  toJson() {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
    };
  }
}

export interface BadRequestErrorInput {
  name: string;
  message: string;
}
