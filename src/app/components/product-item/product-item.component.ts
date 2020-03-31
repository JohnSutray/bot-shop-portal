import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductCategory } from '../../models/product-category.model';
import { tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { LabelsConstants } from '../../constants/labels.constants';
import { EDisplayType } from '../../enums/display-type.enum';
import { stubPipeOnError } from '../../utils/rxjs.utils';
import { ValidationConstants } from '../../constants/validation.constants';
import { log } from 'util';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  constructor(
    private readonly productService: ProductService,
  ) {
  }

  @Input() product: Product;
  @Input() inCreateMode = false;

  @Output() update = new Subject<Product>();
  @Output() cancel = new Subject<any>();

  inEditMode = false;
  allCategories: ProductCategory[] = null;
  mediaFile: File;

  readonly LabelsConstants = LabelsConstants;
  readonly nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  readonly priceControl = new FormControl('', [
    Validators.required,
    Validators.min(0.1),
    Validators.max(ValidationConstants.MAX_NUMBER_VALUE),
  ]);
  readonly descriptionControl = new FormControl('', [Validators.required]);
  readonly categoryControl = new FormControl('', [Validators.required]);
  readonly typeControl = new FormControl('', [Validators.required]);

  readonly productFormGroup = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    price: this.priceControl,
    category: this.categoryControl,
    type: this.typeControl,
  });

  get inFormState(): boolean {
    return this.inCreateMode || this.inEditMode;
  }

  get formInvalid(): boolean {
    if (this.inCreateMode && !this.mediaFile) {
      return true;
    }

    return this.productFormGroup.invalid;
  }

  get mediaUrl(): string {
    return this.product && this.product.mediaUrl;
  }

  get defaultCategory(): string {
    return this.inEditMode && this.product.category;
  }

  get defaultType(): string {
    return this.inEditMode && this.product.type;
  }

  private get formName(): string {
    return this.nameControl.value;
  }

  private get formDescription(): string {
    return this.descriptionControl.value;
  }

  private get formPrice(): number {
    return this.priceControl.value;
  }

  private get formCategory(): string {
    return this.categoryControl.value;
  }

  private get formType(): string {
    return this.typeControl.value;
  }

  ngOnInit(): void {
    this.resetToDefaults();

    if (this.inCreateMode) {
      this.fetchCategories();
    }
  }

  enableEditMode(): void {
    this.inEditMode = true;
    this.fetchCategories();
    this.resetEditModeDefaults();
  }

  submitChanges = (): Subscription => this.save().pipe(stubPipeOnError).subscribe(this.afterCommit);

  setFile(file: File): void {
    this.mediaFile = file;
  }

  removeProduct() {
    this.productService.remove(this.product.id)
      .pipe(stubPipeOnError)
      .subscribe(() => this.update.next(this.product));
  }

  cancelChanges() {
    this.resetToDefaults();
    this.leaveEditMode();
    this.cancel.next();
  }

  private fetchCategories(): void {
    this.productService.getCategories().subscribe(categories => this.allCategories = categories);
  }

  private resetCreateModeDefaults(): void {
    this.nameControl.setValue('Имя продукта');
    this.priceControl.setValue(1);
    this.descriptionControl.setValue('Описание');
    this.typeControl.setValue('Тип');
    this.categoryControl.setValue('Категория');
  }

  private resetEditModeDefaults(): void {
    this.nameControl.setValue(this.product.name);
    this.priceControl.setValue(this.product.price);
    this.descriptionControl.setValue(this.product.description);
    this.categoryControl.setValue(this.product.category);
    this.typeControl.setValue(this.product.type);
  }

  private save = (): Observable<Product> => this.inEditMode
    ? this.productService.update(
      this.product.id,
      this.formName,
      this.formDescription,
      this.formPrice,
      this.formCategory,
      this.formType,
      this.mediaFile,
    )
    : this.productService.create(
      this.formName,
      this.formDescription,
      this.formPrice,
      this.formCategory,
      this.formType,
      this.mediaFile,
    );

  private afterCommit = (product: Product) => {
    this.resetToDefaults();
    this.leaveEditMode();
    this.update.next(product);
  };

  private resetToDefaults(): void {
    this.inCreateMode
      ? this.resetCreateModeDefaults()
      : this.resetEditModeDefaults();

    this.setFile(null);
  }

  private leaveEditMode(): void {
    this.inEditMode = false;
  }
}
