import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BaseButtonModule } from '../../components/base-button/base-button.module';



@NgModule({
  declarations: [LayoutComponent],
  exports: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    BaseButtonModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
})
export class LayoutModule { }
