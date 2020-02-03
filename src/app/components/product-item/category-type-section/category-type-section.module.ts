import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryTypeSectionComponent } from './category-type-section.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatMenuModule, MatOptionModule, MatSlideToggleModule } from '@angular/material';
import { BaseSelectModule } from '../../base-select/base-select.module';
import { BaseTextFieldModule } from '../../base-text-field/base-text-field.module';


@NgModule({
  declarations: [
    CategoryTypeSectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    BaseSelectModule,
    BaseTextFieldModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [
    CategoryTypeSectionComponent,
  ],
})
export class CategoryTypeSectionModule {
}
