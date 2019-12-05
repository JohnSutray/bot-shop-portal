import { Component, Input, Output } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-item-actions',
  templateUrl: './product-item-actions.component.html',
  styleUrls: ['./product-item-actions.component.scss'],
})
export class ProductItemActionsComponent {
  @Input() inFormState: boolean;
  @Input() inEditMode: boolean;
  @Input() formInvalid: boolean;

  @Output() edit = new Subject<void>();
  @Output() remove = new Subject<void>();
  @Output() submitChanges = new Subject<void>();
  @Output() cancel = new Subject<void>();

  readonly LabelsConstants = LabelsConstants;
}
