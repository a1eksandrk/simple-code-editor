export interface ITemplate {
  getTemplate<T>(...args: T[]): string;
}
