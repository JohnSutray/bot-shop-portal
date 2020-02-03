import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonComponent } from './base-button.component';
import { MatButtonModule, MatIconModule } from '@angular/material';



@NgModule({
  declarations: [BaseButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    BaseButtonComponent,
  ],
})
export class BaseButtonModule { }
