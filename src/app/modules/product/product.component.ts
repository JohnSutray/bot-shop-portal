import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { PaginationResult } from '../../models/page-result.model';
import { Product } from '../../models/product.model';
import { delay, tap } from 'rxjs/operators';
import { PaginateOptions } from '../../models/paginate-options.model';
import { ProductCategory } from '../../models/product-category.model';
import { ProductFilter } from '../../models/product-filter.model';
import { FormControl } from '@angular/forms';
import { ProductFilterComponent } from './product-filter/product-filter.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  pageResult: PaginationResult<Product> = new PaginationResult([], 0, 10, 1);
  categories: ProductCategory[] = [];
  productFilter = new ProductFilter('', '');
  paginateOptions = new PaginateOptions(0, 50);

  @ViewChild(ProductFilterComponent, { static: true }) private readonly productFilterComponent: ProductFilterComponent;

  constructor(
    private readonly productService: ProductService,
  ) {
  }

  get shouldShowSecondAddProductButton(): boolean {
    return this.pageResult.items.length > 10;
  }

  onProductCreate = (product: Product) => this.updateCategories()
    .subscribe(() => this.setPatternByProduct(product));

  onProductUpdate = (): Subscription => this.updateCategories()
    .subscribe(this.updateProducts);

  updateCategories = (): Observable<ProductCategory[]> => this.productService.getCategories().pipe(
    tap(this.resetPagination),
    tap(allCategories => this.categories = allCategories),
    delay(1),
  );

  updateProducts = (): Subscription => this.productService.paginate(this.productFilter, this.paginateOptions)
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

  private setPatternByProduct(product: Product): void {
    const category = this.categories.find(c => c.name === product.name);
    this.productFilterComponent.setCategory(category);
    this.productFilterComponent.setType(product.type);
    this.productFilterComponent.updateProductPattern();
  }
}
