import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Product } from '../../models/product.model';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { FileUtils } from '../../utils/file-utils';
import { ProductCategory } from '../../models/product-category.model';
import { switchMap, tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { EDisplayType } from '../../enums/display-type.enum';
import * as AWS from 'aws-sdk';
import { LabelsConstants } from '../../constants/labels.constants';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  constructor(
    private readonly imageUploadService: UploadService,
    private readonly productService: ProductService,
  ) {
  }

  @Input() product: Product;
  @Input() inCreateMode = false;

  @Output() update = new Subject<Product>();
  @Output() cancel = new Subject<any>();

  inNewCategoryMode: boolean;
  inNewTypeMode: boolean;
  inEditMode = false;
  allCategories: ProductCategory[] = [];
  allTypes: string[] = [];
  contentFile: File;

  readonly LabelsConstants = LabelsConstants;
  readonly nameControl = new FormControl('', [Validators.required]);
  readonly priceControl = new FormControl('', [Validators.required]);
  readonly descriptionControl = new FormControl('', [Validators.required]);
  readonly categoryControl = new FormControl('', [Validators.required]);
  readonly typeControl = new FormControl('', [Validators.required]);
  readonly contentUrlControl = new FormControl('', [() => this.contentValidator()]);
  readonly displayTypeControl = new FormControl('', [Validators.required]);

  readonly productFormGroup = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    price: this.priceControl,
    contentUrl: this.contentUrlControl,
    displayType: this.displayTypeControl,
    category: this.categoryControl,
    type: this.typeControl,
  });

  private imagePreviewUrl: string;
  private videoPreviewUrl: string;

  get inFormState(): boolean {
    return this.inCreateMode || this.inEditMode;
  }

  get imageUrl(): string {
    if (!this.inFormState || this.inEditMode && !this.imagePreviewUrl) {
      return this.product.contentUrl;
    }

    return this.imagePreviewUrl;
  }

  get videoUrl(): string {
    if (!this.inFormState || this.inEditMode && !this.videoPreviewUrl) {
      return this.product.contentUrl;
    }

    return this.videoPreviewUrl;
  }

  get formInvalid(): boolean {
    return this.productFormGroup.invalid
      || (this.inCreateMode && !this.contentFile);
  }

  ngOnInit(): void {
    this.resetToDefaults();

    if (this.inCreateMode) {
      this.fetchOptions();
    }
  }

  enableEditMode(): void {
    this.inEditMode = true;
    this.fetchOptions();
    this.resetEditModeDefaults();
  }

  submitChanges() {
    this.uploadContent().pipe(
      switchMap(this.commitChanges),
      tap(this.afterCommit),
    ).subscribe();
  }


  setTypes(types: string[]) {
    this.allTypes = types;
  }

  setFileAndDisplayType(file: File) {
    this.contentFile = file;

    switch (this.contentFile.type) {
      case 'image/jpeg':
      case 'image/png':
        this.displayTypeControl.setValue(EDisplayType.IMAGE);
        FileUtils.toBase64(this.contentFile).subscribe(this.setImagePreview);
        break;
      case 'video/mp4':
        this.displayTypeControl.setValue(EDisplayType.VIDEO);
        this.videoPreviewUrl = URL.createObjectURL(this.contentFile);
        break;
    }

    this.contentUrlControl.updateValueAndValidity();
  }

  removeProduct() {
    this.requestRemoveCurrent().pipe(
      switchMap(() => this.productService.remove(this.product.id)),
      tap(() => this.update.next()),
    ).subscribe();
  }

  removeFileAndPlaceholder() {
    this.contentFile = null;
    this.imagePreviewUrl = null;
    this.videoPreviewUrl = null;
    this.displayTypeControl.setValue(this.inCreateMode ? EDisplayType.IMAGE : this.product.displayType);
  }

  setNewCategoryDefaultValues(): void {
    if (!this.inNewCategoryMode) {
      return;
    }

    this.inNewTypeMode = true;
    this.categoryControl.setValue('Новая категория');
    this.typeControl.setValue('Новый тип');
  }

  cancelChanges() {
    this.resetToDefaults();
    this.leaveEditMode();
    this.cancel.next();
  }

  private setImagePreview = (imageUrl: string) => this.imagePreviewUrl = imageUrl;

  private fetchOptions() {
    this.productService.getAllCategories().pipe(
      tap(categories => this.allCategories = categories),
    ).subscribe();
  }

  private resetCreateModeDefaults(): void {
    this.nameControl.setValue('Имя');
    this.descriptionControl.setValue('Описание');
    this.priceControl.setValue(null);
    this.contentUrlControl.setValue(null);
    this.displayTypeControl.setValue(EDisplayType.IMAGE);
  }

  private resetEditModeDefaults(): void {
    this.nameControl.setValue(this.product.name);
    this.priceControl.setValue(this.product.price);
    this.descriptionControl.setValue(this.product.description);
    this.contentUrlControl.setValue(this.product.contentUrl);
    this.displayTypeControl.setValue(this.product.displayType);
    this.categoryControl.setValue(this.product.category);
    this.typeControl.setValue(this.product.type);
  }

  private uploadContent(): Observable<any> {
    if (!this.contentFile) {
      return of({});
    }

    const removePreviousContent = this.inEditMode
      ? this.requestRemoveCurrent()
      : of({});

    return removePreviousContent.pipe(
      switchMap(this.requestFileUpload),
      tap(this.setNewUrl),
    );
  }

  private requestFileUpload = (): Observable<AWS.S3.ManagedUpload.SendData> => {
    return this.imageUploadService.uploadObject(this.contentFile, 'import-shop-bot');
  };

  private setNewUrl = (result: AWS.S3.ManagedUpload.SendData): void => {
    this.contentUrlControl.setValue(result.Location);
  };

  private requestRemoveCurrent(): Observable<AWS.S3.DeleteObjectOutput> {
    return this.imageUploadService.removeObject(this.product.contentUrl, 'import-shop-bot');
  }

  private contentValidator(): ValidationErrors | null {
    return this.inCreateMode && !this.contentFile
    || this.inEditMode && !this.contentUrlControl.value
      ? { imageControl: false }
      : null;
  }

  private commitChanges = (): Observable<Product> => this.inEditMode
    ? this.productService.update(this.product.id, this.productFormGroup.value)
    : this.productService.create(this.productFormGroup.value);

  private afterCommit = (product: Product) => {
    this.resetToDefaults();
    this.leaveEditMode();
    this.update.next(product);
  };

  private resetToDefaults(): void {
    this.inCreateMode
      ? this.resetCreateModeDefaults()
      : this.resetEditModeDefaults();

    this.resetCommonDefaults();
    this.removeFileAndPlaceholder();
  }

  private resetCommonDefaults(): void {
    this.inNewCategoryMode = false;
    this.inNewTypeMode = false;
  }

  private leaveEditMode(): void {
    this.inEditMode = false;
  }
}
