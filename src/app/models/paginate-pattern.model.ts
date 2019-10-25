import { PaginateOptions } from './paginate-options.model';

export class PaginatePattern<T> {
  constructor(
    readonly condition: T | object = {},
    readonly paginationOptions: PaginateOptions<T> = {},
  ) {
  }
}
