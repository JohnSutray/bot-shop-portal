import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EDisplayType } from '../../../enums/display-type.enum';
import { LabelsConstants } from '../../../constants/labels.constants';
import { ImageConstants } from '../../../constants/image.constants';
import { lookup } from 'mime-types';
import { BehaviorSubject } from 'rxjs';
import { TemplateLifetimeUtils } from '../../../utils/template-lifetime.utils';

@Component({
  selector: 'app-media-preview-section',
  templateUrl: './media-preview-section.component.html',
  styleUrls: ['./media-preview-section.component.scss'],
})
export class MediaPreviewSectionComponent implements OnInit {
  readonly EDisplayType = EDisplayType;
  readonly LabelsConstants = LabelsConstants;

  @ViewChild('videoElement', { static: false }) videoElement: ElementRef<HTMLVideoElement>;
  @ViewChild('imageElement', { static: false }) imageElement: ElementRef<HTMLVideoElement>;
  @ViewChild('videoElementSource', { static: false }) videoElementSource: ElementRef<HTMLSourceElement>;

  @Input() readonly alreadyLoadedMediaUrl: string = null;
  @Input() readonly inFormState = false;
  @Output() readonly mediaFile = new BehaviorSubject<File>(null);

  get displayType(): EDisplayType {
    const contentType = lookup(
      this.getExtensionOf(this.mediaFilename),
    ).toString();

    if (contentType.startsWith('image')) {
      return EDisplayType.IMAGE;
    }

    if (contentType.startsWith('video')) {
      return EDisplayType.VIDEO;
    }
  }

  ngOnInit(): void {
    TemplateLifetimeUtils.callAfterNextViewInit(this.initHandleFileSubscription);
  }

  initHandleFileSubscription = (): void => {
    this.handleNewFile();
    this.mediaFile.subscribe(this.handleNewFile);
  };

  private handleNewFile = (): void => {
    if (this.displayType === EDisplayType.IMAGE) {
      TemplateLifetimeUtils.callAfterNextViewInit(this.reloadImage);
    }

    if (this.displayType === EDisplayType.VIDEO) {
      TemplateLifetimeUtils.callAfterNextViewInit(this.reloadVideo);
    }
  };

  private reloadVideo = (): void => {
    this.videoElementSource.nativeElement.src = this.contentUrl;
    this.videoElement.nativeElement.load();
  };

  private reloadImage = (): string => this.imageElement.nativeElement.src = this.contentUrl;

  // noinspection JSMethodCanBeStatic
  private getExtensionOf(name: string) {
    return name.slice(name.lastIndexOf('.'));
  }

  private get contentUrl(): string {
    if (this.mediaFile.value) {
      return URL.createObjectURL(this.mediaFile.value);
    }

    return this.alreadyLoadedMediaUrl || ImageConstants.PRODUCT_IMAGE_PLACEHOLDER;
  }

  private get mediaFilename(): string {
    if (this.mediaFile.value) {
      return this.mediaFile.value.name;
    }

    return this.alreadyLoadedMediaUrl || ImageConstants.PRODUCT_IMAGE_PLACEHOLDER;
  }
}
