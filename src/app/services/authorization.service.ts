import { Injectable } from '@angular/core';
import { BotManagementService } from './bot-management.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private readonly botManagementService: BotManagementService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  private name: string;

  get botName(): string {
    return this.name;
  }

  get apiToken(): string {
    return this.localStorageService.get<string>('bottoken');
  }

  get isSigned(): boolean {
    return !!this.apiToken;
  }

  signIn(token: string): Observable<boolean> {
    return this.botManagementService.getBotName(token).pipe(
      tap(console.log),
      catchError(() => of('')),
      tap(result => this.name = result),
      tap(result => result && this.localStorageService.put('bottoken', token)),
      map(Boolean),
    );
  }

  signOut(): void {
    this.localStorageService.remove('bottoken');
    this.name = null;
  }

  restoreSignData(): void {
    const token = this.localStorageService.get<string>('bottoken');

    if (token) {
      this.signIn(token).subscribe();
    }
  }
}
