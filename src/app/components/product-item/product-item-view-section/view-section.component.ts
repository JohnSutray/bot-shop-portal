import { Component, Input } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss'],
})
export class ViewSectionComponent {
  readonly LabelsConstants = LabelsConstants;

  @Input() product: Product;
}
