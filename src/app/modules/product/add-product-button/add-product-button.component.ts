import { Component, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LabelsConstants } from '../../../constants/labels.constants';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-add-product-button',
  templateUrl: './add-product-button.component.html',
  styleUrls: ['./add-product-button.component.scss'],
})
export class AddProductButtonComponent {
  readonly LabelsConstants = LabelsConstants;
  readonly isCreateMode = new Subject<boolean>();

  @Output() created = new Subject<Product>();
}
