import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { Authorization } from '../models/authorization.model';
import { Router } from '@angular/router';
import { stubPipeOnError } from '../utils/rxjs.utils';
import { AuthenticateManagementService } from './generated/api/authenticate-management.service';

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
    this.authenticateManagementService.getToken({ telegramToken: token }).pipe(
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

  saveSignData = (auth: Authorization): void => {
    this.localStorageService.put(this.AUTHORIZATION_KEY, auth.token);
    this.localStorageService.put(this.NAME_KEY, auth.name);
    this.localStorageService.put(this.AVATAR_IMAGE, auth.avatar);
  };

  // TODO: create navigation service
  navigateToHome = () => this.router.navigate(['/home']);

  navigateToAccount = () => this.router.navigate(['/account']);
}
