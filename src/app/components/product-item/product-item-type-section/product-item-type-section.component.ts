import { Component, Input } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-item-type-section',
  templateUrl: './product-item-type-section.component.html',
  styleUrls: ['product-item-type-section.component.scss'],
})
export class ProductItemTypeSectionComponent {
  readonly LabelsConstants = LabelsConstants;

  @Input() inNewTypeMode: boolean;
  @Input() typeControl: FormControl;
  @Input() allTypes: string[];
}
