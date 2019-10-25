import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { PageResult } from '../../models/page-result.model';
import { PaginatePattern } from '../../models/paginate-pattern.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  productPage: PageResult<Product>;
  products: Product[] = [];
  isCreateMode: boolean;

  constructor(
    private readonly productService: ProductService,
  ) {
  }

  ngOnInit() {
    this.updateProducts();
  }

  onProductUpdate() {
    this.updateProducts();
    this.isCreateMode = false;
  }

  updateProducts() {
    this.productService.findAll(
      new PaginatePattern<Product>({}, { limit: 10, page: 1 }),
    ).subscribe(productPage => {
      this.products = productPage.docs;
      this.productPage = productPage;
    });
  }
}
