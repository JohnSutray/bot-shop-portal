import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EndpointConstants } from '../constants/endpoint.constants';
import { ActionResult } from '../models/action-result.model';

@Injectable({ providedIn: 'root' })
export class AccountClient {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  create(telegramToken: string): Observable<ActionResult> {
    return this.httpClient.put<ActionResult>(
      EndpointConstants.ACCOUNT,
      { telegramToken },
    );
  }

  removeCurrentAccount(): Observable<ActionResult> {
    return this.httpClient.delete<ActionResult>(
      EndpointConstants.ACCOUNT,
    );
  }
}
