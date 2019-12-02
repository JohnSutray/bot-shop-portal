import { Component, Input, OnInit, Output } from '@angular/core';
import { PageResult } from '../../models/page-result.model';
import { Subject } from 'rxjs';
import { PaginateOptions } from '../../models/paginate-options.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() pageResult: PageResult<any>;
  @Output() paginateOptions = new Subject<PaginateOptions<any>>();

  page: number;
  limit: number;

  get nextDisabled(): boolean {
    return this.page === this.pageResult.totalPages;
  }

  get previousDisabled(): boolean {
    return this.page === 1;
  }

  private get _paginateOptions(): PaginateOptions<any> {
    return new PaginateOptions<any>(this.page, this.limit);
  }

  updatePageOptions() {
    this.paginateOptions.next(this._paginateOptions);
  }

  previous() {
    this.page--;
    this.updatePageOptions();
  }

  next() {
    this.page++;
    this.updatePageOptions();
  }
}
