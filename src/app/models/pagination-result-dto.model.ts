export class PaginationResultDto<TItem> {
  readonly items: TItem[];
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
