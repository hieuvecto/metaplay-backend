export class UserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'USER_INPUT_ERROR';
    Object.defineProperty(this, 'name', { value: 'User input error' });
  }
}
