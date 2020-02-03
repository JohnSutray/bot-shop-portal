import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseSelectComponent } from './base-select.component';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [BaseSelectComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [
    BaseSelectComponent,
  ],
})
export class BaseSelectModule { }
