export class ForbiddenError extends Error {
  name: string;
  status: number;

  constructor(forbiddenErrorInput: ForbiddenErrorInput) {
    super(forbiddenErrorInput.message);
    this.name = forbiddenErrorInput.name;
    this.status = 403;
  }

  toJson() {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
    };
  }
}

export interface ForbiddenErrorInput {
  name: string;
  message: string;
}
