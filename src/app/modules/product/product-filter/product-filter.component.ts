import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductCategory } from '../../../models/product-category.model';
import { Subject } from 'rxjs';
import { ProductFilter } from '../../../models/product-filter.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnChanges {
  @Input() categories: ProductCategory[];
  @Output() productFilter = new Subject<ProductFilter>();

  typeControl = new FormControl('');
  categoryControl = new FormControl('');

  categoryMapper = (category: ProductCategory): string => category.name;

  updateProductPattern = (): void => this.productFilter.next(new ProductFilter(this.category.name, this.type));

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.categories || this.categoriesEmpty) {
      return;
    }

    const oldCategory = this.category;
    const oldType = this.type;

    this.actualizeFilter();

    if (this.category !== oldCategory || this.type !== oldType) {
      this.updateProductPattern();
    }
  }

  private actualizeFilter(): void {
    const categoryFromCollection = this.categories.find(c => c.name === this.category.name);

    if (!categoryFromCollection) {
      this.categoryControl.setValue(this.categories[0]);
      this.typeControl.setValue(this.category.types[0]);
      return;
    }

    this.categoryControl.setValue(categoryFromCollection);

    if (!this.category.types.includes(this.type)) {
      this.typeControl.setValue(this.category.types[0]);
    }
  }

  private get categoriesEmpty(): boolean {
    const isEmpty = !this.categories || !this.categories[0] || !this.categories[0].types[0];
    return !!isEmpty;
  }

  private get category(): ProductCategory {
    return this.categoryControl.value;
  }

  private get type(): string {
    return this.typeControl.value;
  }
}
