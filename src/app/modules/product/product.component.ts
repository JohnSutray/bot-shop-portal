import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { PaginateSettings } from '../../models/paginate-pattern.model';
import { BehaviorSubject, combineLatest, merge, Subject } from 'rxjs';
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

  readonly updateProducts = new Subject<void>();
  readonly hasNext = new Subject();
  readonly hasPrevious = new Subject();

  get productPattern(): Product {
    const pattern = {} as Product;

    if (this._selectedCategory) {
      pattern.category = this._selectedCategory;
    }

    if (this._selectedType) {
      pattern.type = this._selectedType;
    }

    return pattern;
  }

  readonly paginateOptions = combineLatest(this.page, this.limit)
    .pipe(map(this.createPaginateOptions));

  readonly products = merge(
  ).pipe(
    map(([pattern, options]) => new PaginateSettings<Product>(pattern, options)),
    switchMap(settings => this.productService.findAll(settings)),
    tap(result => this.hasNext.next(result.hasNextPage)),
    tap(result => this.hasPrevious.next(result.hasPrevPage)),
    map(result => result.docs),
  );

  readonly pageFieldDisabled = new BehaviorSubject<boolean>(false);
  readonly maxPage = new BehaviorSubject<number>(2);

  private _selectedCategory: string;
  private _selectedType: string;
  private _page: number = 1;
  private _limit: number = 10;


  onCategorySelect(): void {
    this.
  }


  isCreateMode: boolean;

  constructor(
    private readonly productService: ProductService,
  ) {
  }

  createPaginateOptions([page, limit]: [number, number]): PaginateOptions<Product> {
    return { page, limit };
  }

  onProductUpdate() {
    this.isCreateMode = false;
  }
}
