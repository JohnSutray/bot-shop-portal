import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoDialogComponent } from './info-dialog.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandleInterceptor } from '../../interceptors/error-handle.interceptor';
import { MatButtonModule, MatDialogModule } from '@angular/material';



@NgModule({
  declarations: [
    InfoDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  entryComponents: [
    InfoDialogComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandleInterceptor,
      multi: true,
    },
  ],
})
export class InfoDialogModule { }
