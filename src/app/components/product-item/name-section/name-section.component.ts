import { Component, Input, ViewEncapsulation } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { FormControl } from '@angular/forms';
import { ValidationConstants } from '../../../constants/validation.constants';

@Component({
  selector: 'app-name-section',
  templateUrl: './name-section.component.html',
  styleUrls: ['./name-section.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NameSectionComponent {
  readonly ValidationConstants = ValidationConstants;
  readonly LabelsConstants = LabelsConstants;

  @Input() nameControl: FormControl;
}
