import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [
    PaginatorComponent,
  ],
})
export class PaginatorModule { }
