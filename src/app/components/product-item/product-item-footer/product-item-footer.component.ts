import { Component, Input, Output } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-item-footer',
  templateUrl: './product-item-footer.component.html',
  styleUrls: ['./product-item-footer.component.scss'],
})
export class ProductItemFooterComponent {
  @Input() inFormState: boolean;
  @Input() inEditMode: boolean;
  @Input() formInvalid: boolean;

  @Output() edit = new Subject<void>();
  @Output() remove = new Subject<void>();
  @Output() submitChanges = new Subject<void>();
  @Output() cancel = new Subject<void>();

  readonly LabelsConstants = LabelsConstants;
}
