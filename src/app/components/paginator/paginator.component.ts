import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaginationResult } from '../../models/page-result.model';
import { Subject } from 'rxjs';
import { PaginationFilter } from '../../models/paginate-filter.model';
import { FormControl } from '@angular/forms';
import { RangeUtils } from '../../utils/range.utils';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() pageResult: PaginationResult<any>;
  @Output() paginationFilter = new Subject<PaginationFilter>();

  pageControl = new FormControl(0);
  limitControl = new FormControl(50);

  get pageVariants(): number[] {
    if (this.pageResult.totalPages === 1) {
      return [0];
    }

    return RangeUtils.range(0, this.pageResult.totalPages - 1);
  }

  get pageLimitVariants(): number[] {
    const allProductsAmount = this.pageResult.totalPages * this.pageResult.limit;
    const baseStep = 5;

    return allProductsAmount > baseStep
      ? RangeUtils.range(baseStep, allProductsAmount, baseStep)
      : [baseStep];
  }

  pageMapper = (page: number): number => page + 1;

  updatePageOptions = (): void => this.paginationFilter.next(this._paginationFilter);

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.pageResult) {
      return;
    }

    this.pageControl.setValue(this.pageResult.page);
    this.limitControl.setValue(this.pageResult.limit);
  }

  private get _paginationFilter(): PaginationFilter {
    return new PaginationFilter(this.pageControl.value, this.limitControl.value);
  }
}
