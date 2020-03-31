import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { FormControl } from '@angular/forms';
import { ProductCategory } from '../../../models/product-category.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { ValidationConstants } from '../../../constants/validation.constants';

@Component({
  selector: 'app-category-type-section',
  templateUrl: './category-type-section.component.html',
  styleUrls: ['./category-type-section.component.scss'],
})
export class CategoryTypeSectionComponent implements OnInit {
  readonly LabelsConstants = LabelsConstants;
  readonly ValidationConstants = ValidationConstants;

  @ViewChild('categoryTextField', { read: MatMenuTrigger }) categoryMenuTrigger: MatMenuTrigger;
  @ViewChild('typeTextField', { read: MatMenuTrigger }) typeMenuTrigger: MatMenuTrigger;

  @Input() readonly categoryControl: FormControl;
  @Input() readonly defaultCategory: string;
  @Input() readonly defaultType: string;
  @Input() readonly categories: ProductCategory[];
  @Input() readonly typeControl: FormControl;

  get selectedCategory(): ProductCategory {
    return this.categories.find(c => c.name === this.categoryControl.value);
  }

  get typeItems(): string[] {
    if (this.selectedCategory) {
      return this.selectedCategory.types;
    }

    if (this.defaultType) {
      return [this.defaultType];
    }

    return [];
  }

  get categoryItems(): string[] {
    if (this.categories) {
      return this.categories.map(c => c.name);
    }

    if (this.defaultCategory) {
      return [this.defaultCategory];
    }

    return [];
  }

  ngOnInit() {
    if (this.defaultCategory) {
      this.categoryControl.setValue(this.defaultCategory);
    }

    if (this.defaultType) {
      this.typeControl.setValue(this.defaultType);
    }
  }
}
