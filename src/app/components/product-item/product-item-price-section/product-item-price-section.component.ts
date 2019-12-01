import { Component, Input } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-item-price-section',
  templateUrl: './product-item-price-section.component.html',
  styleUrls: ['./product-item-price-section.component.scss'],
})
export class ProductItemPriceSectionComponent {
  readonly LabelsConstants = LabelsConstants;

  @Input() priceControl: FormControl;
}
