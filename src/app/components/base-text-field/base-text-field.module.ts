import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTextFieldComponent } from './base-text-field.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
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
