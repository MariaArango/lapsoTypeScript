export class UnauthorizedError extends Error {
  name: string;
  status: number;

  constructor(unauthorizedErrorInput: UnauthorizedErrorInput) {
    super(unauthorizedErrorInput.message);
    this.name = unauthorizedErrorInput.name;
    this.status = 401
  }

  toJson() {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
    };
  }
}

export interface UnauthorizedErrorInput {
  name: string;
  message: string;

}
