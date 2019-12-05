import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-item-content-management-section',
  templateUrl: './product-item-content-management-section.component.html',
  styleUrls: ['./product-item-content-management-section.component.scss'],
})
export class ProductItemContentManagementSectionComponent {
  readonly LabelsConstants = LabelsConstants;

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  @Input() inEditMode: boolean;

  @Output() file = new Subject<File>();
  @Output() removeFile = new Subject<void>();

  private isFileSelected = false;

  get canRestoreImage(): boolean {
    return this.inEditMode && this.isFileSelected;
  }

  openFileSelectDialog(): void {
    this.fileInput.nativeElement.click();
  }

  selectFile() {
    const file = this.fileInput.nativeElement.files[0];
    this.fileInput.nativeElement.value = null;

    if (file) {
      this.isFileSelected = true;
      this.file.next(file);
    }
  }

  removeSelected() {
    this.removeFile.next();
    this.isFileSelected = false;
  }
}
