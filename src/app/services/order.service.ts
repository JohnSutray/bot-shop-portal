import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { PaginationResult } from '../models/page-result.model';
import { PaginateSettings } from '../models/paginate-pattern.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getOrders(settings: PaginateSettings<Order> = new PaginateSettings()): Observable<PaginationResult<Order>> {
    return this.httpClient.post<PaginationResult<Order>>(`${environment.apiUrl}/order/all`, settings);
  }

  removeOrder(id: string): Observable<Order> {
    return this.httpClient.delete<Order>(`${environment.apiUrl}/order/${id}`);
  }
}
