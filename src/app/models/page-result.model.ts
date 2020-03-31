import { PaginationResultDto } from './pagination-result-dto.model';

export class PaginationResult<TItem> {
  public static fromDto<TDto, TItem>(
    pageResult: PaginationResultDto<TDto>,
    itemMapper: (dto: TDto) => TItem,
  ): PaginationResult<TItem> {
    return new PaginationResult<TItem>(
      pageResult.items.map(itemMapper),
      pageResult.page, pageResult.limit,
      pageResult.totalPages,
    );
  }

  constructor(
    readonly items: TItem[],
    readonly page: number,
    readonly limit: number,
    readonly totalPages: number,
  ) {
  }


  get hasPrevPage(): boolean {
    return this.page === 0;
  }

  get hasNextPage(): boolean {
    return this.page === this.totalPages - 1;
  }
}
