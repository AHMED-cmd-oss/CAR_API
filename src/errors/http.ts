export class HttpError extends Error {
  status: number;

  constructor(message: string) {
      super(message);
      this.status = 404; // ✅ إضافة status code
      this.name = "NotFoundError";
      this.toJSON();
  }
  

  toJSON() {
      return { error: this.name, message: this.message, status: this.status };
  }
}
