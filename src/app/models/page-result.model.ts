export class PageResult<TItem> {
  public static fromDto<TItem>(pageResult: PageResult<TItem>): PageResult<TItem> {
    return new PageResult<TItem>(pageResult.items, pageResult.page, pageResult.limit, pageResult.totalPages);
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
