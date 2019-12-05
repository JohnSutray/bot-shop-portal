import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductItemActionsComponent } from './product-item-actions/product-item-actions.component';
import { ProductItemHeaderComponent } from './product-item-header/product-item-header.component';
import { ProductItemTypeSectionComponent } from './product-item-type-section/product-item-type-section.component';
import { ProductItemCategorySectionComponent } from './product-item-category-section/product-item-category-section.component';
import { ProductItemDescriptionSectionComponent } from './product-item-description-section/product-item-description-section.component';
import { ProductItemNameSectionComponent } from './product-item-name-section/product-item-name-section.component';
import { ProductItemPriceSectionComponent } from './product-item-price-section/product-item-price-section.component';
import { ProductItemViewSectionComponent } from './product-item-view-section/product-item-view-section.component';
import { ProductItemContentSectionComponent } from './product-item-content-section/product-item-content-section.component';
import {
  ProductItemContentManagementSectionComponent,
} from './product-item-content-management-section/product-item-content-management-section.component';


@NgModule({
  declarations: [
    ProductItemComponent,
    ProductItemActionsComponent,
    ProductItemHeaderComponent,
    ProductItemTypeSectionComponent,
    ProductItemCategorySectionComponent,
    ProductItemDescriptionSectionComponent,
    ProductItemNameSectionComponent,
    ProductItemPriceSectionComponent,
    ProductItemViewSectionComponent,
    ProductItemContentSectionComponent,
    ProductItemContentManagementSectionComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
  ],
  exports: [
    ProductItemComponent,
  ],
})
export class ProductItemModule {
}
