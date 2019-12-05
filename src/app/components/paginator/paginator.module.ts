import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatCardModule,
    ReactiveFormsModule,
  ],
  exports: [
    PaginatorComponent,
  ],
})
export class PaginatorModule {
}
