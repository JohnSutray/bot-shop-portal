import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { LabelsConstants } from '../../../constants/labels.constants';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-media-upload-section',
  templateUrl: './media-upload-section.component.html',
  styleUrls: ['./media-upload-section.component.scss'],
})
export class MediaUploadSectionComponent {
  readonly LabelsConstants = LabelsConstants;

  @ViewChild('fileInput', { static: true }) fileInput: ElementRef<HTMLInputElement> = null;

  @Input() inEditMode = false;
  @Output() file = new BehaviorSubject<File>(null);
  @Output() removeFile = new Subject<void>();

  openFileSelectDialog(): void {
    this.fileInput.nativeElement.click();
  }

  selectFile() {
    const file = this.fileInput.nativeElement.files[0];
    this.fileInput.nativeElement.value = null;

    if (file) {
      this.file.next(file);
    }
  }
}
