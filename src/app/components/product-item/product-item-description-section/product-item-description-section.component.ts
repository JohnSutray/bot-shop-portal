import { Component, Input } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { FormControl } from '@angular/forms';
import { ValidationConstants } from '../../../constants/validation.constants';

@Component({
  selector: 'app-product-item-description-section',
  templateUrl: './product-item-description-section.component.html',
  styleUrls: ['./product-item-description-section.component.scss'],
})
export class ProductItemDescriptionSectionComponent {
  readonly LabelsConstants = LabelsConstants;
  readonly ValidationConstants = ValidationConstants;

  @Input() descriptionControl: FormControl;
}
