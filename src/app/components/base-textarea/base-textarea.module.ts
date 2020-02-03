import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTextareaComponent } from './base-textarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';



@NgModule({
  declarations: [BaseTextareaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class BaseTextareaModule { }
