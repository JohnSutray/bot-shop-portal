import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InfoDialogService } from '../services/info-dialog.service';
import { InfoDialogData } from '../models/info-dialog-data.model';
import { LabelsConstants } from '../constants/labels.constants';

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {
  constructor(
    private readonly infoDialogService: InfoDialogService,
  ) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(this.displayAndThrowError),
    );
  }

  displayAndThrowError = (error: HttpErrorResponse): Observable<never> => {
    this.infoDialogService.open(
      new InfoDialogData(
        LabelsConstants.SOMETHING_IS_WRONG,
        error.error,
      ),
    );

    return throwError(error);
  };
}
