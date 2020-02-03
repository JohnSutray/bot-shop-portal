import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
  ) {
  }

  canActivate(): boolean {
    if (!this.authorizationService.isSigned) {
      this.router.navigate(['/account']);
    }

    return this.authorizationService.isSigned;
  }
}
