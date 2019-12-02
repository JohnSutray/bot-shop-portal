import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductItemModule } from '../../components/product-item/product-item.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ProductRoutingModule } from './product-routing.module';
import { PaginatorModule } from '../../components/paginator/paginator.module';
import { ProductFilterComponent } from './product-filter/product-filter.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductFilterComponent,
    ProductFilterComponent,
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
  ],
})
export class ProductModule {
}
