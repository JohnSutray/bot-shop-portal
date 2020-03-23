import { Component, Input } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-view-section',
  templateUrl: './product-view-section.component.html',
  styleUrls: ['./product-view-section.component.scss'],
})
export class ProductViewSectionComponent {
  readonly LabelsConstants = LabelsConstants;

  @Input() product: Product;
}
