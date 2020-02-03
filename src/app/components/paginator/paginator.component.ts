import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PageResult } from '../../models/page-result.model';
import { Subject } from 'rxjs';
import { PaginateOptions } from '../../models/paginate-options.model';
import { FormControl } from '@angular/forms';
import { RangeUtils } from '../../utils/range.utils';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() pageResult: PageResult<any>;
  @Output() paginateOptions = new Subject<PaginateOptions>();

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

  updatePageOptions = (): void => this.paginateOptions.next(this._paginateOptions);

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.pageResult) {
      return;
    }

    this.pageControl.setValue(this.pageResult.page);
    this.limitControl.setValue(this.pageResult.limit);
  }

  private get _paginateOptions(): PaginateOptions {
    return new PaginateOptions(this.pageControl.value, this.limitControl.value);
  }
}
