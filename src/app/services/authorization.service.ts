import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { AuthResult } from '../models/authorization.model';
import { Router } from '@angular/router';
import { stubPipeOnError } from '../utils/rxjs.utils';
import { AuthenticateManagementService } from './generated/api/authenticate-management.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  private readonly AUTHORIZATION_KEY = 'Authorization';
  private readonly NAME_KEY = 'Name';
  private readonly AVATAR_IMAGE = 'AvatarImage';

  constructor(
    private readonly authenticateManagementService: AuthenticateManagementService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
  ) {
  }

  get botName(): string {
    return this.localStorageService.get<string>(this.NAME_KEY);
  }

  get apiToken(): string {
    return this.localStorageService.get<string>(this.AUTHORIZATION_KEY);
  }

  get avatarImage(): string {
    return this.localStorageService.get<string>(this.AVATAR_IMAGE);
  }

  get isSigned(): boolean {
    return !!this.apiToken;
  }

  signIn(token: string): void {
    this.getToken(token).pipe(
      catchError(stubPipeOnError),
      tap(this.saveSignData),
      tap(this.navigateToHome),
    ).subscribe();
  }

  signOut(): void {
    this.localStorageService.remove(this.AUTHORIZATION_KEY);
    this.localStorageService.remove(this.NAME_KEY);
    this.localStorageService.remove(this.AVATAR_IMAGE);
    this.navigateToAccount();
  }

  private saveSignData = (auth: AuthResult): void => {
    this.localStorageService.put(this.AUTHORIZATION_KEY, auth.token);
    this.localStorageService.put(this.NAME_KEY, auth.name);
    this.localStorageService.put(this.AVATAR_IMAGE, auth.avatar);
  };

  // TODO: create navigation service
  private navigateToHome = () => this.router.navigate(['/home']);

  private navigateToAccount = () => this.router.navigate(['/account']);

  private getToken(telegramToken: string): Observable<AuthResult> {
    return this.authenticateManagementService.getToken({ telegramToken }).pipe(map(AuthResult.fromDto));
  }
}
