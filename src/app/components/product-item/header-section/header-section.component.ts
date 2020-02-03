import { Component, Input } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss'],
})
export class HeaderSectionComponent {
  @Input() inFormState: boolean;
  @Input() inEditMode: boolean;
  @Input() product: Product;

  readonly LabelsConstants = LabelsConstants;
}
