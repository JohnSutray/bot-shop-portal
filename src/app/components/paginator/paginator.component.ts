import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageResult } from '../../models/page-result.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { PaginateOptions } from '../../models/paginate-options.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() pageResult: PageResult<any>;
  @Output() paginateOptions = new BehaviorSubject<PaginateOptions<any>>({
    page: 1,
    limit: 50,
  });

  pageControl = new FormControl();
  limitControl = new FormControl();

  get pages(): number[] {
    return Array.from(Array(this.pageResult.totalPages).keys())
      .map(i => i + 1);
  }

  get sizes(): number[] {
    return [5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 150];
  }

  get nextDisabled(): boolean {
    return this.pageControl.value === this.pageResult.totalPages;
  }

  get previousDisabled(): boolean {
    return this.pageControl.value === 1;
  }

  private get _paginateOptions(): PaginateOptions<any> {
    return new PaginateOptions<any>(
      this.pageControl.value,
      this.limitControl.value,
    );
  }

  updatePageOptions() {
    this.paginateOptions.next(this._paginateOptions);
  }

  previous() {
    this.pageControl.setValue(this.pageControl.value - 1);
    this.updatePageOptions();
  }

  next() {
    this.pageControl.setValue(this.pageControl.value + 1);
    this.updatePageOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pageResult) {
      this.pageControl.setValue(this.pageResult.page);
      this.limitControl.setValue(this.pageResult.limit);
    }
  }
}
