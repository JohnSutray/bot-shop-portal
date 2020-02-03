import { Component, Input } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-price-section',
  templateUrl: './price-section.component.html',
  styleUrls: ['./price-section.component.scss'],
})
export class PriceSectionComponent {
  readonly LabelsConstants = LabelsConstants;

  @Input() priceControl: FormControl;
}
