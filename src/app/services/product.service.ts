import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { PaginationResult } from '../models/page-result.model';
import { ProductCategory } from '../models/product-category.model';
import { EndpointConstants } from '../constants/endpoint.constants';
import { PaginateOptions } from '../models/paginate-options.model';
import { map } from 'rxjs/operators';
import { ProductFilter } from '../models/product-filter.model';
import { ProductManagementService } from './generated/api/product-management.service';
import { mapCollection } from '../utils/rxjs.utils';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly productManagementService: ProductManagementService,
  ) {
  }

  findAll(productFilter: ProductFilter, paginateOptions: PaginateOptions): Observable<PaginationResult<Product>> {
    return this.httpClient.get<PaginationResult<Product>>(
      `${EndpointConstants.PRODUCT}/${productFilter.category}/${productFilter.type}/${paginateOptions.page}/${paginateOptions.limit}`,
    ).pipe(map(PaginationResult.fromDto));
  }

  update(id: string, product: FormData): Observable<Product> {
    return this.httpClient.post<Product>(`${EndpointConstants.PRODUCT}/${id}`, product);
  }

  getAllCategories(): Observable<ProductCategory[]> {
    return this.productManagementService.productCategoryGet()
      .pipe(mapCollection(ProductCategory.fromDto));
  }

  create(product: FormData): Observable<Product> {
    return this.httpClient.put<Product>(EndpointConstants.PRODUCT, product);
  }

  remove(id: string): Observable<Product> {
    return this.httpClient.delete<Product>(`${EndpointConstants.PRODUCT}/${id}`);
  }
}
