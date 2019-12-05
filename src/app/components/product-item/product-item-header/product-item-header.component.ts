import { Component, Input } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-item-header',
  templateUrl: './product-item-header.component.html',
  styleUrls: ['./product-item-header.component.scss'],
})
export class ProductItemHeaderComponent {
  @Input() inFormState: boolean;
  @Input() inEditMode: boolean;
  @Input() product: Product;

  readonly LabelsConstants = LabelsConstants;
}
