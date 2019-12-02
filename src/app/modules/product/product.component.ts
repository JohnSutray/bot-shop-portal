import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { PaginateSettings } from '../../models/paginate-pattern.model';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { ProductCategory } from '../../models/product-category.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { PaginateOptions } from '../../models/paginate-options.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  readonly allCategories = new Subject<ProductCategory>();

  readonly selectedCategory = new BehaviorSubject<string>(null);
  readonly selectedType = new BehaviorSubject<string>(null);
  readonly page = new BehaviorSubject(1);
  readonly limit = new BehaviorSubject(10);
  readonly hasNext = new BehaviorSubject(false);
  readonly hasPrevious = new BehaviorSubject(false);

  readonly productPattern = combineLatest(this.selectedCategory, this.selectedType)
    .pipe(map(this.createPattern));

  readonly paginateOptions = combineLatest(this.page, this.limit)
    .pipe(map(this.createPaginateOptions));

  readonly products = combineLatest(this.productPattern, this.paginateOptions).pipe(
    map(([pattern, options]) => new PaginateSettings<Product>(pattern, options)),
    switchMap(settings => this.productService.findAll(settings)),
    tap(result => this.hasNext.next(result.hasNextPage)),
    tap(result => this.hasPrevious.next(result.hasPrevPage)),
    map(result => result.docs),
  );


  isCreateMode: boolean;

  constructor(
    private readonly productService: ProductService,
  ) {
  }

  createPattern([category, type]: [string, string]): Product {
    const pattern = {} as Product;

    if (category) {
      pattern.category = category;
    }

    if (type) {
      pattern.type = type;
    }

    return pattern;
  }

  createPaginateOptions([page, limit]: [number, number]): PaginateOptions<Product> {
    return { page, limit };
  }

  onProductUpdate() {
    this.isCreateMode = false;
  }
}
