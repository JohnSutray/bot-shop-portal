import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-base-textarea',
  templateUrl: './base-textarea.component.html',
})
export class BaseTextareaComponent {
  @Input() label: string;
  @Input() isTextArea: string;
  @Input() rows: number;
  @Input() control: FormControl;
  @Input() maxLength: number;
}
