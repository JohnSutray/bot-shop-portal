import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { FormControl } from '@angular/forms';
import { ValidationConstants } from '../../../constants/validation.constants';

@Component({
  selector: 'app-description-section',
  templateUrl: './description-section.component.html',
  styleUrls: ['./description-section.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DescriptionSectionComponent {
  readonly LabelsConstants = LabelsConstants;
  readonly ValidationConstants = ValidationConstants;

  @Input() descriptionControl: FormControl;
}
