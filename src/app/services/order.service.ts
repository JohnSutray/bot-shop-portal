import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { PaginationResult } from '../models/page-result.model';
import { environment } from '../../environments/environment';
import { OrderManagementService } from './generated/api/order-management.service';
import { PaginationFilter } from '../models/paginate-filter.model';
import { mapPaginationResult } from '../utils/rxjs.utils';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly orderManagementService: OrderManagementService,
  ) {
  }

  getOrders(paginationFilter: PaginationFilter): Observable<PaginationResult<Order>> {
    return this.orderManagementService.getOrders(paginationFilter.page, paginationFilter.limit).pipe(mapPaginationResult(Order.fromDto));
  }

  removeOrder(id: string): Observable<Order> {
    return this.httpClient.delete<Order>(`${environment.apiUrl}/order/${id}`);
  }
}
