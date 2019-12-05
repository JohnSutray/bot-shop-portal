import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorizationService } from '../services/authorization.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizeInterceptor implements HttpInterceptor {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = this.authorizationService.isSigned
      ? this.cloneRequestWithToken(request)
      : request;

    return next.handle(newRequest).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.authorizationService.signOut();
          this.router.navigate(['/sign-in'], { skipLocationChange: true});
        }

        return throwError(error);
      }),
    );
  }

  private cloneRequestWithToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        bottoken: this.authorizationService.apiToken,
      },
    });
  }
}
