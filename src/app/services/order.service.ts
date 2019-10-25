import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { PageResult } from '../models/page-result.model';
import { PaginatePattern } from '../models/paginate-pattern.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getOrders(pattern: PaginatePattern<Order> = new PaginatePattern()): Observable<PageResult<Order>> {
    return this.httpClient.post<PageResult<Order>>(`${environment.apiUrl}/order/all`, pattern);
  }

  removeOrder(id: string): Observable<Order> {
    return this.httpClient.delete<Order>(`${environment.apiUrl}/order/${id}`);
  }
}
