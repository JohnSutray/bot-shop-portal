import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-actions-section',
  templateUrl: './actions-section.component.html',
  styleUrls: ['./actions-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsSectionComponent {
  readonly LabelsConstants = LabelsConstants;

  @Input() inEditMode: boolean;
  @Input() inCreateMode: boolean;
  @Input() formInvalid: boolean;

  @Output() edit = new Subject<void>();
  @Output() remove = new Subject<void>();
  @Output() submitChanges = new Subject<void>();
  @Output() cancel = new Subject<void>();

  get inFormState(): boolean {
    return this.inCreateMode || this.inEditMode;
  }

  get editActionIcon(): string {
    if (this.inEditMode) {
      return 'done';
    }

    if (this.inCreateMode) {
      return 'save';
    }

    return 'edit';
  }

  get cancelActionIcon(): string {
    if (this.inFormState) {
      return 'clear';
    }

    return 'delete';
  }

  handleEditAction(): void {
    if (!this.inFormState) {
      this.edit.next();
      return;
    }

    this.submitChanges.next();
  }

  handleCancelAction(): void {
    if (this.inFormState) {
      this.cancel.next();
      return;
    }

    this.remove.next();
  }
}
