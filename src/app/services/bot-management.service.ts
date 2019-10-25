import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { ApiUrl } from '../models/api-url.model';

@Injectable()
export class BotManagementService {
  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  getBotName(token: string): Observable<string> {
    return this.httpClient.get<{ name: string }>(`${environment.apiUrl}/bot/${token}`).pipe(
      catchError(() => of(null)),
      map(result => result.name),
    );
  }

  create(token: string): Observable<boolean> {
    return this.httpClient.post<ApiUrl>(`${environment.apiUrl}/bot/${token}`, {}).pipe(
      catchError(() => of(null)),
      map(Boolean),
    );
  }

  remove(token: string): Observable<boolean> {
    return this.httpClient.delete<ApiUrl>(`${environment.apiUrl}/bot/${token}`).pipe(
      catchError(() => of(null)),
      map(Boolean),
    );
  }
}
