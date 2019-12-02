import { Component, Input, Output } from '@angular/core';
import { ProductCategory } from '../../../models/product-category.model';
import { Subject } from 'rxjs';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
  @Input() allCategories: ProductCategory[];
  @Output() productPattern = new Subject<Product | object>();

  selectedCategory: ProductCategory;
  selectedType: string;

  updateProductPattern() {
    this.productPattern.next({
      category: this.selectedCategory.name,
      type: this.selectedType,
    });
  }
}
