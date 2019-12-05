import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { PageResult } from '../../models/page-result.model';
import { Product } from '../../models/product.model';
import { map, tap } from 'rxjs/operators';
import { PaginateOptions } from '../../models/paginate-options.model';
import { PaginateSettings } from '../../models/paginate-pattern.model';
import { ProductCategory } from '../../models/product-category.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  readonly pageResult = new BehaviorSubject<PageResult<Product>>({
    totalPages: 2,
    docs: [],
    hasNextPage: true,
    hasPrevPage: false,
    page: 1,
    limit: 50,
  });
  readonly allCategories = new BehaviorSubject<ProductCategory[]>([]);
  readonly products = this.pageResult.pipe(map(page => page.docs));

  productPattern: Product;
  isCreateMode: boolean;

  constructor(
    private readonly productService: ProductService,
  ) {
  }

  onProductUpdate() {
    this.isCreateMode = false;
    this.updateCategories();
  }

  updateProducts(paginateOptions: PaginateOptions<any>) {
    this.productService.findAll(
      new PaginateSettings<Product>(this.productPattern, paginateOptions),
    ).subscribe(page => this.pageResult.next(page));
  }

  setProductPattern(productPattern: Product): void {
    this.productPattern = productPattern;
    this.updateProducts(new PaginateOptions<any>(1, 50));
  }

  updateCategories() {
    this.productService.getAllCategories()
      .subscribe(categories => this.allCategories.next(categories));
  }

  ngOnInit(): void {
    this.updateCategories();
  }
}
