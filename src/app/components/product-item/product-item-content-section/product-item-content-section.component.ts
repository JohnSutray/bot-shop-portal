import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { EDisplayType } from '../../../enums/display-type.enum';
import { LabelsConstants } from '../../../constants/labels.constants';
import { ImageConstants } from '../../../constants/image.constants';

@Component({
  selector: 'app-product-item-content-section',
  templateUrl: './product-item-content-section.component.html',
  styleUrls: ['./product-item-content-section.component.scss'],
})
export class ProductItemContentSectionComponent implements OnChanges {
  readonly EDisplayType = EDisplayType;
  readonly LabelsConstants = LabelsConstants;
  readonly imagePlaceholder = ImageConstants.PRODUCT_IMAGE_PLACEHOLDER;

  @ViewChild('videoElement') videoElement: ElementRef<HTMLVideoElement>;
  @ViewChild('videoElementSource') videoElementSource: ElementRef<HTMLSourceElement>;

  @Input() displayType: EDisplayType;
  @Input() videoUrl: string;
  @Input() imageUrl: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.videoUrl || changes.displayType && changes.displayType.currentValue === EDisplayType.VIDEO) {
      this.reloadVideoPreview(this.videoUrl);
    }
  }

  private reloadVideoPreview = (source: string): void => {
    if (!source) {
      return;
    }

    setTimeout(() => {
      this.videoElementSource.nativeElement.src = source;
      this.videoElement.nativeElement.load();
    });
  };
}
