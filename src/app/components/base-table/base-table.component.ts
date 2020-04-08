import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from '../../models/table-column.model';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationResult } from '../../models/page-result.model';
import { tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { PaginationFilter } from '../../models/paginate-filter.model';
import { RangeUtils } from '../../utils/range.utils';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent<T> implements OnInit {
  @Input() readonly columns: TableColumn<T>[];
  @Input() readonly loadFunction: (paginationFilter: PaginationFilter) => Observable<PaginationResult<T>>;
  @Input() readonly tooltipMapper: (data: T) => string;
  @Input() readonly initialPage = 0;
  @Input() readonly initialLimit = 10;

  @Output() readonly rowClick = new EventEmitter<T>();

  dataSource = new MatTableDataSource<T>();

  paginationResult: PaginationResult<T> = new PaginationResult<T>([], 0, 10, 1);
  headerRowDefinition: string[];

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  get length(): number {
    return this.paginationResult.totalPages * this.paginationResult.limit;
  }

  get pageSize(): number {
    return this.paginationResult.limit;
  }

  get pageSizeOptions(): number[] {
    return RangeUtils.range(5, this.paginationResult.limit * this.paginationResult.totalPages, 5);
  }

  ngOnInit(): void {
    this.loadData(this.initialPage, this.initialLimit);
  }

  updatePage(pageEvent: PageEvent): void {
    this.loadData(pageEvent.pageIndex, pageEvent.pageSize);
  }

  handleButtonCellClick(
    event: Event,
    handler: (data: T, index: number) => any,
    data: T,
    index: number,
  ): void {
    event.stopPropagation();
    event.preventDefault();

    handler(data, index);
  }

  private loadData(page: number, limit: number): void {
    this.initHeaderRowDefinition();
    this.loadFunction(new PaginationFilter(page, limit)).pipe(
      tap(paginationResult => this.paginationResult = paginationResult),
      tap(paginationResult => this.dataSource = new MatTableDataSource<T>(paginationResult.items)),
      tap(() => this.changeDetectorRef.detectChanges()),
    ).subscribe();
  }

  private initHeaderRowDefinition(): void {
    this.headerRowDefinition = this.columns.map(column => column.id);
  }
}
