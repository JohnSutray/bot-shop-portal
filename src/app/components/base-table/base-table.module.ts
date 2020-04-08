import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTableComponent } from './base-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BaseButtonModule } from '../base-button/base-button.module';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [BaseTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    BaseButtonModule,
    MatTooltipModule,
  ],
  exports: [
    BaseTableComponent,
  ],
})
export class BaseTableModule { }
