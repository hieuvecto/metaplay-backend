export class UserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'USER_INPUT_ERROR';
    Object.defineProperty(this, 'name', { value: 'User input error' });
  }
}

export class NotFoundError extends UserInputError {
  constructor(message: string) {
    super(message);
    this.name = 'ENTITY_NOT_FOUND_ERROR';
    Object.defineProperty(this, 'name', { value: 'Entity not found error' });
  }
}

export class BadRequestError extends UserInputError {
  constructor(message: string) {
    super(message);
    this.name = 'BAD_REQUEST_ERROR';
    Object.defineProperty(this, 'name', { value: 'Bad request error' });
  }
}

export class ConflictError extends UserInputError {
  constructor(message: string) {
    super(message);
    this.name = 'CONFLICT_ERROR';
    Object.defineProperty(this, 'name', { value: 'Conflict error' });
  }
}
