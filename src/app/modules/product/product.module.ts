import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductItemModule } from '../../components/product-item/product-item.module';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ProductRoutingModule } from './product-routing.module';


@NgModule({
  declarations: [
    ProductComponent,
  ],
  imports: [
    ProductRoutingModule,
    CommonModule,
    ProductItemModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ProductModule {
}
