import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Authorization } from '../models/authorization.model';
import { EndpointConstants } from '../constants/endpoint.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationClient {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  signIn(telegramToken: string): Observable<Authorization> {
    return this.httpClient.post<Authorization>(
      EndpointConstants.AUTHORIZE,
      { telegramToken },
    );
  }
}
