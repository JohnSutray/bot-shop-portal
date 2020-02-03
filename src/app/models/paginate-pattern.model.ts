import { PaginateOptions } from './paginate-options.model';

export class PaginateSettings<T> {
  constructor(
    readonly condition: T | object = {},
    readonly paginationOptions: PaginateOptions = {},
  ) {
  }
}
