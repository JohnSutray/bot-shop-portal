import { Injectable } from '@angular/core';
import { LoadingOverlayService } from '../services/loading-overlay.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingOverlayInterceptor implements HttpInterceptor {
  constructor(
    private readonly loadingOverlayService: LoadingOverlayService,
  ) {
  }

  private readonly requests: HttpRequest<any>[] = [];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      return next.handle(req);
    }

    this.addRequest(req);

    return next.handle(req).pipe(
      finalize(() => this.removeRequest(req)),
    );
  }

  addRequest(request: HttpRequest<any>) {
    this.requests.push(request);
    this.loadingOverlayService.setIsLoading(true);
  }

  removeRequest(request: HttpRequest<any>) {
    this.requests.splice(this.requests.indexOf(request), 1);
    this.loadingOverlayService.setIsLoading(!!this.requests.length);
  }
}
