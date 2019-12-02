import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Subject } from 'rxjs';
import { PageResult } from '../../models/page-result.model';
import { Product } from '../../models/product.model';
import { map } from 'rxjs/operators';
import { PaginateOptions } from '../../models/paginate-options.model';
import { PaginateSettings } from '../../models/paginate-pattern.model';
import { ProductCategory } from '../../models/product-category.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  readonly pageResult = new Subject<PageResult<Product>>();
  readonly allCategories = new Subject<ProductCategory[]>();
  readonly products = this.pageResult.pipe(map(page => page.docs));
  productPattern: Product;
  isCreateMode: boolean;

  constructor(
    private readonly productService: ProductService,
  ) {
  }

  onProductUpdate() {
    this.isCreateMode = false;

    this.productService.getAllCategories()
      .subscribe(categories => this.allCategories.next(categories));
  }

  updateProducts(paginateOptions: PaginateOptions<any>) {
    this.productService.findAll(new PaginateSettings<Product>(
      this.productPattern,
      paginateOptions,
    )).subscribe(page => this.pageResult.next(page));
  }

  setProductPattern(productPattern: Product): void {
    this.productPattern = productPattern;
    this.updateProducts(new PaginateOptions<any>(1, 10));
  }
}
