import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { LabelsConstants } from '../../constants/labels.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly LabelsConstants = LabelsConstants;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router,
  ) {
  }

  signOut(): void {
    this.authorizationService.signOut();
    this.router.navigate(['/account']);
  }
}
