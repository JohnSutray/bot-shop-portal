import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductItemComponent,
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
  ],
  exports: [
    ProductItemComponent,
  ],
})
export class ProductItemModule {
}
