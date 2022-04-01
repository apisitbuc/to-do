export class ValidateFieldError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFound extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AlreadyExists extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class RequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}
