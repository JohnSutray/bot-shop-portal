import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { LabelsConstants } from '../../constants/labels.constants';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly LabelsConstants = LabelsConstants;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly accountService: AccountService,
  ) {
  }

  signOut(): void {
    this.authorizationService.signOut();
  }

  remove(): void {
    this.accountService.removeCurrentAccount();
  }
}
