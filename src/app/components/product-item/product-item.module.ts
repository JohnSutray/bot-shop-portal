import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsSectionComponent } from './actions-section/actions-section.component';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { DescriptionSectionComponent } from './description-section/description-section.component';
import { NameSectionComponent } from './name-section/name-section.component';
import { PriceSectionComponent } from './price-section/price-section.component';
import { ProductViewSectionComponent } from './product-item-view-section/product-view-section.component';
import { MediaPreviewSectionComponent } from './media-preview-section/media-preview-section.component';
import { MediaUploadSectionComponent } from './media-upload-section/media-upload-section.component';
import { CategoryTypeSectionModule } from './category-type-section/category-type-section.module';
import { BaseButtonModule } from '../base-button/base-button.module';
import { BaseTextFieldModule } from '../base-text-field/base-text-field.module';
import { BaseTextareaModule } from '../base-textarea/base-textarea.module';


@NgModule({
  declarations: [
    ProductItemComponent,
    ActionsSectionComponent,
    HeaderSectionComponent,
    DescriptionSectionComponent,
    NameSectionComponent,
    PriceSectionComponent,
    ProductViewSectionComponent,
    MediaPreviewSectionComponent,
    MediaUploadSectionComponent,
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
    CategoryTypeSectionModule,
    BaseButtonModule,
    BaseTextFieldModule,
    MatDividerModule,
    BaseTextareaModule,
  ],
  exports: [
    ProductItemComponent,
  ],
})
export class ProductItemModule {
}
