export class PaginateOptions<T> {
  select?: T | object | string;
  sort?: object | string;
  offset?: number;
  page?: number;
  limit?: number;
}
