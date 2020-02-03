import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { AuthorizationClient } from './authorization.client.service';
import { Authorization } from '../models/authorization.model';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  private readonly AUTHORIZATION_KEY = 'Authorization';
  private readonly NAME_KEY = 'Name';

  constructor(
    private readonly authorizationClient: AuthorizationClient,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  get botName(): string {
    return this.localStorageService.get<string>(this.NAME_KEY);
  }

  get apiToken(): string {
    return this.localStorageService.get<string>(this.AUTHORIZATION_KEY);
  }

  get isSigned(): boolean {
    return !!this.apiToken;
  }

  signIn(token: string): Observable<boolean> {
    return this.authorizationClient.signIn(token).pipe(
      catchError(() => EMPTY),
      tap(this.saveSignData),
      map(Boolean),
    );
  }

  signOut(): void {
    this.localStorageService.remove(this.AUTHORIZATION_KEY);
    this.localStorageService.remove(this.NAME_KEY);
  }

  saveSignData = (auth: Authorization): void => {
    this.localStorageService.put(this.AUTHORIZATION_KEY, auth.token);
    this.localStorageService.put(this.NAME_KEY, auth.name);
  };
}
