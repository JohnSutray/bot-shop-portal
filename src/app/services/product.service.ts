import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { PageResult } from '../models/page-result.model';
import { ProductCategory } from '../models/product-category.model';
import { PaginatePattern } from '../models/paginate-pattern.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  findAll(pattern: PaginatePattern<Product>): Observable<PageResult<Product>> {
    return this.httpClient.post<PageResult<Product>>(`${environment.apiUrl}/product/find/all`, pattern);
  }

  findAllById(ids: string[]): Observable<Product[]> {
    return this.httpClient.post<Product[]>(`${environment.apiUrl}/product/find/all/id`, ids);
  }

  update(id: string, product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${environment.apiUrl}/product/${id}`, product);
  }

  getAllCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(`${environment.apiUrl}/product/category/all`);
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${environment.apiUrl}/product`, product);
  }

  remove(id: string): Observable<Product> {
    return this.httpClient.delete<Product>(`${environment.apiUrl}/product/${id}`);
  }
}
