import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { PageResult } from '../../models/page-result.model';
import { BehaviorSubject } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { Line } from '../../models/line.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  productPreview = new BehaviorSubject<Product>(null);
  orderPage = new BehaviorSubject<PageResult<Order>>({
    limit: 10,
    page: 1,
    hasPrevPage: false,
    hasNextPage: true,
    items: [],
    totalPages: 2,
  });
  orders = this.orderPage.pipe(
    map(page => page.items),
  );

  constructor(
    private readonly orderService: OrderService,
  ) {
  }

  ngOnInit() {
    this.updatePage();
  }

  createTableDataSource(order: Order): MatTableDataSource<Line> {
    return new MatTableDataSource<Line>(order.lines);
  }

  removeOrder(order: Order) {
    this.orderService.removeOrder(order.id).pipe(
      tap(() => this.updatePage()),
    ).subscribe();
  }

  updatePage(pageShift: number = 0, condition: Order | object = {}, limit: number = null): void {
    this.orderPage.pipe(
      first(),
      switchMap(orderPage => this.orderService.getOrders({
        condition,
        paginationOptions: {
          page: orderPage.page + pageShift,
          limit: limit || orderPage.limit,
        },
      })),
      tap(page => this.orderPage.next(page)),
    ).subscribe();
  }
}
