import { ChangeDetectionStrategy, Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ProductCategory } from '../../../models/product-category.model';
import { Subject } from 'rxjs';
import { ProductFilter } from '../../../models/product-filter.model';
import { FormControl } from '@angular/forms';
import { TemplateLifetimeUtils } from '../../../utils/template-lifetime.utils';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterComponent implements OnChanges {
  @Input() readonly categories: ProductCategory[] = [];
  @Output() readonly productFilter = new Subject<ProductFilter>();

  readonly typeControl = new FormControl('');
  readonly categoryControl = new FormControl(new ProductCategory('', []));

  setType(type: string): void {
    this.typeControl.setValue(type);
  }

  setCategory(category: ProductCategory): void {
    this.categoryControl.setValue(category);
  }

  categoryMapper = (category: ProductCategory): string => category.name;

  updateProductPattern = (): void => this.productFilter.next(
    new ProductFilter(this.category.name, this.type),
  );

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.categories || this.categoriesEmpty) {
      return;
    }

    const oldCategory = this.category;
    const oldType = this.type;

    this.actualizeFilter();

    const categoryChanged = this.category !== oldCategory;
    const typeChanged = this.type !== oldType;
    const filterChanged = categoryChanged || typeChanged;

    if (filterChanged) {
      this.updateProductPattern();
    }
  }

  private actualizeFilter(): void {
    if (!this.currentCategoryModel) {
      this.setDefaultCategory();
      this.setDefaultType();
      return;
    }

    this.setCategory(this.currentCategoryModel);

    if (!this.currentTypeExist) {
      this.setDefaultType();
    }
  }

  get category(): ProductCategory {
    return this.categoryControl.value;
  }

  private get currentCategoryModel(): ProductCategory {
    return this.categories.find(c => c.name === this.category.name);
  }

  private get categoriesEmpty(): boolean {
    const isEmpty = !this.categories || !this.categories[0] || !this.categories[0].types[0];

    return !!isEmpty;
  }

  private setDefaultCategory(): void {
    this.setCategory(this.categories[0]);
  }

  private setDefaultType(): void {
    this.setType(this.category.types[0]);
  }

  private get currentTypeExist(): boolean {
    return this.category.types.includes(this.type);
  }

  private get type(): string {
    return this.typeControl.value;
  }

  selectCategory(): void {
    TemplateLifetimeUtils.callAfterNextViewInit(
      this.updateProductPattern,
    );
  }
}
