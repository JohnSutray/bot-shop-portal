import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
  ) {
  }

  canActivate(): boolean {
    if (!this.authorizationService.isSigned) {
      this.router.navigate(['/sign-in'], {skipLocationChange: true});
    }

    return this.authorizationService.isSigned;
  }
}
