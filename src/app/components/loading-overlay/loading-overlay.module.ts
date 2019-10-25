import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingOverlayComponent } from './loading-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingOverlayInterceptor } from '../../interceptors/loading-overlay.interceptor';



@NgModule({
  declarations: [
    LoadingOverlayComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    LoadingOverlayComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingOverlayInterceptor,
      multi: true,
    },
  ],
})
export class LoadingOverlayModule { }
