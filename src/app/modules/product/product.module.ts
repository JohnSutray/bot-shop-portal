import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductItemModule } from '../../components/product-item/product-item.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ProductRoutingModule } from './product-routing.module';
import { PaginatorModule } from '../../components/paginator/paginator.module';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductButtonComponent } from './add-product-button/add-product-button.component';
import { ActionPanelModule } from '../../components/action-panel/action-panel.module';
import { BaseSelectModule } from '../../components/base-select/base-select.module';


@NgModule({
  declarations: [
    ProductComponent,
    ProductFilterComponent,
    AddProductButtonComponent,
  ],
  imports: [
    ProductRoutingModule,
    CommonModule,
    ProductItemModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    ActionPanelModule,
    BaseSelectModule,
  ],
})
export class ProductModule {
}
