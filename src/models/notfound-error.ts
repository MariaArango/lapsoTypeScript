export class NotFoundError extends Error {
  name: string;
  status: number;

  constructor(notfoundErrorInput: NotFoundErrorInput) {
    super(notfoundErrorInput.message);
    this.name = notfoundErrorInput.name;
    this.status = 404;
  }

  toJson() {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
    };
  }
}

export interface NotFoundErrorInput {
  name: string;
  message: string;
}
