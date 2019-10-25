import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Product } from '../../models/product.model';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ImageUploadService } from '../../services/image-upload.service';
import { ImageConstants } from '../../constants/image.constants';
import { FileUtils } from '../../utils/file-utils';
import { ProductCategory } from '../../models/product-category.model';
import { switchMap, tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  constructor(
    private readonly imageUploadService: ImageUploadService,
    private readonly productService: ProductService,
  ) {
  }

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement>;
  @Input() product: Product;
  @Input() isCreateMode = false;
  @Input() isEditMode = false;
  @Output() update = new Subject<Product>();
  @Output() cancel = new Subject<any>();
  uploadedImagePlaceholder: string;
  isNewCategoryMode: boolean;
  isNewTypeMode: boolean;
  categories: ProductCategory[] = [];
  types: string[] = [];

  readonly nameControl = new FormControl('', [Validators.required]);
  readonly priceControl = new FormControl('', [Validators.required]);
  readonly descriptionControl = new FormControl('', [Validators.required]);
  readonly categoryControl = new FormControl('', [Validators.required]);
  readonly typeControl = new FormControl('', [Validators.required]);
  readonly imageControl = new FormControl('', [() => this.imageValidator()]);
  readonly productFormGroup = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    price: this.priceControl,
    imageUrl: this.imageControl,
    category: this.categoryControl,
    type: this.typeControl,
  });

  imageFile: File;

  get isFormState(): boolean {
    return this.isCreateMode || this.isEditMode;
  }

  get imageUrl(): string {
    if (!this.isFormState) {
      return this.product.imageUrl;
    }

    return this.uploadedImagePlaceholder
      || this.imageControl.value
      || ImageConstants.PRODUCT_IMAGE_PLACEHOLDER;
  }

  get invalidState(): boolean {
    return this.productFormGroup.invalid
      || (this.isCreateMode && !this.imageFile);
  }

  ngOnInit(): void {
    if (this.isCreateMode) {
      this.fetchOptions();
    }
  }

  afterUpdate = (product: Product) => {
    if (this.isCreateMode) {
      this.resetCreateModeDefaults();
    } else {
      this.resetEditModeDefaults();
    }

    this.update.next(product);
  };

  onEditClick(): void {
    this.fetchOptions();
    this.resetEditModeDefaults();
    this.isEditMode = true;
  }

  onChangesSubmit() {
    this.uploadImage()
      .pipe(
        switchMap(() => this.isEditMode
          ? this.productService.update(this.product.id, this.productFormGroup.value)
          : this.productService.create(this.productFormGroup.value),
        ),
      ).subscribe(this.afterUpdate);
  }

  onSelectFileClick(): void {
    this.fileInput.nativeElement.click();
  }

  onCategorySelect() {
    const category = this.categories.find(c => c.name === this.categoryControl.value);
    this.types = category.productTypes;

    const newTypeValue = this.isEditMode && category.name === this.product.category
      ? this.product.type
      : null;

    this.typeControl.setValue(newTypeValue);
  }

  onFileSelect() {
    this.imageFile = this.fileInput.nativeElement.files[0];
    FileUtils.toBase64(this.imageFile).subscribe(
      imageUrl => this.uploadedImagePlaceholder = imageUrl,
    );
  }

  removeProduct() {
    this.imageUploadService.removeImage(this.product.imageUrl, 'import-shop-bot').pipe(
      switchMap(() => this.productService.remove(this.product.id)),
      tap(() => this.update.next()),
    ).subscribe();
  }

  onNewCategoryModeChange(): void {
    if (this.isNewCategoryMode) {
      this.isNewTypeMode = true;
      this.categoryControl.setValue('Новая категория');
      this.typeControl.setValue('Новый тип');
    }
  }

  fetchOptions() {
    this.productService.getAllCategories().pipe(
      tap(categories => this.categories = categories),
      tap(() => this.isEditMode && this.onCategorySelect()),
    ).subscribe();
  }

  resetCreateModeDefaults(): void {
    this.isNewCategoryMode = false;
    this.isNewTypeMode = false;
    this.nameControl.setValue('Имя');
    this.priceControl.setValue(0);
    this.descriptionControl.setValue('Описание');
    this.imageControl.setValue('');
    this.clearImage();
  }

  resetEditModeDefaults(): void {
    this.isNewCategoryMode = false;
    this.isNewTypeMode = false;
    this.isEditMode = false;
    this.nameControl.setValue(this.product.name);
    this.priceControl.setValue(this.product.price);
    this.descriptionControl.setValue(this.product.description);
    this.imageControl.setValue(this.product.imageUrl);
    this.categoryControl.setValue(this.product.category);
    this.typeControl.setValue(this.product.type);
  }

  clearImage() {
    this.imageFile = null;
    this.uploadedImagePlaceholder = null;
  }

  uploadImage() {
    if (!this.imageFile) {
      return of({});
    }

    if (this.isCreateMode) {
      return this.imageUploadService.uploadImage(this.imageFile, 'import-shop-bot').pipe(
        tap(result => this.imageControl.setValue(result.Location)),
      );
    }

    return this.imageUploadService.removeImage(this.imageControl.value, 'import-shop-bot').pipe(
      switchMap(() => this.imageUploadService.uploadImage(this.imageFile, 'import-shop-bot')),
      tap(result => this.imageControl.setValue(result.Location)),
    );
  }

  imageValidator(): ValidationErrors | null {
    if (this.isCreateMode && !this.imageFile) {
      return {
        imageControl: false,
      };
    }
  }

  onCancel() {
    this.isEditMode = false;
    this.cancel.next();
  }
}
