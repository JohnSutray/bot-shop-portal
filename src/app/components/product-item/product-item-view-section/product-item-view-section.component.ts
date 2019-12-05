import { Component, Input } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-item-view-section',
  templateUrl: './product-item-view-section.component.html',
  styleUrls: ['./product-item-view-section.component.scss'],
})
export class ProductItemViewSectionComponent {
  readonly LabelsConstants = LabelsConstants;

  @Input() product: Product;
}
