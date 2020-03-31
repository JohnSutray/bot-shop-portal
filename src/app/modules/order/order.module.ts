import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ProductItemModule } from '../../components/product-item/product-item.module';
import { OrderRoutingModule } from './order-routing.module';


@NgModule({
  declarations: [
    OrderComponent,
  ],
  imports: [
    OrderRoutingModule,
    CommonModule,
    MatTableModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    ProductItemModule,
  ],
})
export class OrderModule {
}
