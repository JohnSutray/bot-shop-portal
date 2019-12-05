import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    MatButtonModule,
  ],
})
export class HomeModule {
}
