export interface Strategy<T> {
  validate(obj: T, message: string[]): string[];
}
