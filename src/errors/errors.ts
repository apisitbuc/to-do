export class CustomError extends Error {
  constructor(
    message: string,
    public code?: string,
    public errors?: any,
    public title?: string,
    public data?: any,
  ) {
    super(message);
  }
}

export class NotFound extends CustomError {}

export class ValidateError extends CustomError {}

export class CustomBadRequest extends CustomError {}

export class ValidateFieldError extends CustomError {}

export class UnAuthorizedError extends CustomError {}
