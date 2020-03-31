import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
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
