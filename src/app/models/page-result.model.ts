export class PageResult<TContent> {
  readonly docs: TContent[];
  readonly page: number;
  readonly limit: number;
  readonly hasPrevPage: boolean;
  readonly hasNextPage: boolean;
  readonly totalPages: number;
}
