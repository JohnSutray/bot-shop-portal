import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { PageResult } from '../../models/page-result.model';
import { Product } from '../../models/product.model';
import { delay, tap } from 'rxjs/operators';
import { PaginateOptions } from '../../models/paginate-options.model';
import { ProductCategory } from '../../models/product-category.model';
import { ProductFilter } from '../../models/product-filter.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  pageResult: PageResult<Product> = new PageResult([], 0, 10, 1);
  categories: ProductCategory[];
  productFilter = new ProductFilter('', '');
  paginateOptions = new PaginateOptions(0, 50);

  constructor(
    private readonly productService: ProductService,
  ) {
  }

  get shouldShowSecondAddProductButton(): boolean {
    return this.pageResult.items.length > 10;
  }

  onProductUpdate = (): Subscription => this.updateCategories().pipe(
    delay(1),
    tap(this.updateProducts),
  ).subscribe();

  updateCategories = (): Observable<ProductCategory[]> => this.productService.getAllCategories().pipe(
    tap(this.resetPagination),
    tap(allCategories => this.categories = allCategories),
  );

  updateProducts = (): Subscription => this.productService.findAll(this.productFilter, this.paginateOptions)
    .subscribe(pageResult => this.pageResult = pageResult);

  ngOnInit(): void {
    this.updateCategories().subscribe();
  }

  updateProductFilter(filter: ProductFilter) {
    this.resetPagination();
    this.productFilter = filter;
    this.updateProducts();
  }

  updatePagination(options: PaginateOptions) {
    this.paginateOptions = options;
    this.updateProducts();
  }

  private resetPagination = (): PaginateOptions => this.paginateOptions = new PaginateOptions(0, 50);
}
