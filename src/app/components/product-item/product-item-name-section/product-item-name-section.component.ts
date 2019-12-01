import { Component, Input } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { FormControl } from '@angular/forms';
import { ValidationConstants } from '../../../constants/validation.constants';

@Component({
  selector: 'app-product-item-name-section',
  templateUrl: './product-item-name-section.component.html',
  styleUrls: ['./product-item-name-section.component.scss'],
})
export class ProductItemNameSectionComponent {
  readonly ValidationConstants = ValidationConstants;
  readonly LabelsConstants = LabelsConstants;

  @Input() nameControl: FormControl;
}
