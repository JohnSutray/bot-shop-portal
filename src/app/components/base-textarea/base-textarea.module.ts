import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTextareaComponent } from './base-textarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [BaseTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  exports: [
    BaseTextareaComponent,
  ],
})
export class BaseTextareaModule { }
