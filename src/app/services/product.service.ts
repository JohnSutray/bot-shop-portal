import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { PaginationResult } from '../models/page-result.model';
import { ProductCategory } from '../models/product-category.model';
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

  paginate(productFilter: ProductFilter, paginateOptions: PaginateOptions): Observable<PaginationResult<Product>> {
    return this.productManagementService.getProducts(
      productFilter.category,
      productFilter.type,
      paginateOptions.page,
      paginateOptions.limit,
    ).pipe(map(page => PaginationResult.fromDto(page, Product.fromDto)));
  }

  update(
    id: string, name?: string, description?: string, price?: number, category?: string, type?: string, media?: File,
  ): Observable<Product> {
    return this.productManagementService.updateProduct(id, price, name, description, category, type, media).pipe(map(Product.fromDto));
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.productManagementService.getCategories().pipe(mapCollection(ProductCategory.fromDto));
  }

  create(name: string, description: string, price: number, category: string, type: string, media: File): Observable<Product> {
    return this.productManagementService.createProduct(price, name, description, category, type, media).pipe(map(Product.fromDto));
  }

  remove(id: string): Observable<Product> {
    return this.productManagementService.deleteProduct(id);
  }
}
