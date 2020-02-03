import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BaseSelectModule } from '../base-select/base-select.module';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    BaseSelectModule,
  ],
  exports: [
    PaginatorComponent,
  ],
})
export class PaginatorModule { }
