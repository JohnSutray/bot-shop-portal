import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTextFieldComponent } from './base-text-field.component';
import { MatButtonModule, MatIconModule, MatInputModule, MatMenuModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BaseTextFieldComponent],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [
    BaseTextFieldComponent,
  ],
})
export class BaseTextFieldModule { }
