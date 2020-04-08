import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LabelsConstants } from '../../constants/labels.constants';

@Component({
  selector: 'app-base-text-field',
  templateUrl: './base-text-field.component.html',
})
export class BaseTextFieldComponent {
  readonly LabelsConstants = LabelsConstants;

  @Input() label: string;
  @Input() rows: number;
  @Input() control: FormControl;
  @Input() maxLength: number;
  @Input() suffixIcon: string;
  @Input() hints: string[];
  @Input() fieldClass: string;
  @Input() isNumber = false;
  @Input() isPassword = false;
  @Input() isTextarea = false;

  handleSuffixClick(click: MouseEvent) {
    click.preventDefault();
    click.stopPropagation();
  }

  get fieldType(): string {
    if (this.isPassword) {
      return 'password';
    }

    if (this.isNumber) {
      return 'number';
    }

    return 'text';
  }

  get hasRequiredError(): boolean {
    return this.control.errors && this.control.errors.required;
  }

  get minLengthError(): { requiredLength: number } {
    return this.control.errors && this.control.errors.minlength;
  }

  get currentLength(): number {
    const currentValue = this.control.value || '';

    return currentValue.length;
  }

  get minValueError(): { min: number } {
    return this.control.errors && this.control.errors.min;
  }

  get maxValueError(): { max: number } {
    return this.control.errors && this.control.errors.max;
  }
}
