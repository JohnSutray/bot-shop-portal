import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { FormControl } from '@angular/forms';
import { ProductCategory } from '../../../models/product-category.model';
import { Subject } from 'rxjs';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-product-item-category-section',
  templateUrl: './product-item-category-section.component.html',
  styleUrls: ['./product-item-category-section.component.scss'],
})
export class ProductItemCategorySectionComponent implements OnChanges {
  readonly LabelsConstants = LabelsConstants;

  @Input() inNewCategoryMode: boolean;
  @Input() categoryControl: FormControl;
  @Input() allCategories: ProductCategory[];

  @Output() categorySelected = new Subject<ProductCategory>();

  selectCategory(change: MatSelectChange) {
    const category = this.allCategories.find(c => c.name === change.value);

    this.categorySelected.next(category);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.allCategories && this.allCategories[0]) {
      this.categoryControl.setValue(this.allCategories[0].name);
      this.categorySelected.next(this.allCategories[0]);
    }
  }
}
