class AppError {
  public readonly message: string;

  public readonly title: string;

  public readonly description: string;

  public readonly statusCode: number;

  constructor(message: string, title = '', description = '', statusCode = 400) {
    this.message = message;
    this.title = title;
    this.description = description;
    this.statusCode = statusCode;
  }
}

export default AppError;