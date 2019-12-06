import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProductCategory } from '../../../models/product-category.model';
import { Subject } from 'rxjs';
import { Product } from '../../../models/product.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnChanges, OnInit {
  @Input() allCategories: ProductCategory[];
  @Output() productPattern = new Subject<Product | object>();

  categoryControl = new FormControl();
  typeControl = new FormControl();

  get allTypes(): string[] {
    return this.categoryControl.value.productTypes || [];
  }

  updateProductPattern() {
    this.productPattern.next({
      category: this.categoryControl.value.name,
      type: this.typeControl.value,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.allCategories) {
      return;
    }

    this.categoryControl.setValue(this.allCategories[0]);
    this.trySetType();
  }

  ngOnInit(): void {
    this.categoryControl.valueChanges.subscribe(() => this.trySetType());
    this.typeControl.valueChanges.subscribe(() => this.updateProductPattern());
  }

  trySetType() {
    const category = this.categoryControl.value as ProductCategory;

    if (category && category.productTypes[0]) {
      this.typeControl.setValue(category.productTypes[0]);
    }
  }
}
