import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-price-section',
  templateUrl: './price-section.component.html',
  styleUrls: ['./price-section.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PriceSectionComponent {
  readonly LabelsConstants = LabelsConstants;

  @Input() priceControl: FormControl;
}
