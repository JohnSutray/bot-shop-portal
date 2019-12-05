export class PaginateOptions<T> {
  constructor(
    readonly page?: number,
    readonly limit?: number,
    readonly select?: T | object | string,
    readonly sort?: object | string,
    readonly offset?: number,
  ) {
  }
}
