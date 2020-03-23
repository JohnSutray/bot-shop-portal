import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { LabelsConstants } from '../../constants/labels.constants';
import { ValidationConstants } from '../../constants/validation.constants';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  readonly ValidationConstants = ValidationConstants;
  readonly LabelsConstants = LabelsConstants;

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly accountService: AccountService,
  ) {
  }

  tokenFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(46),
  ]);

  signIn() {
    this.authorizationService.signIn(this.tokenFormControl.value);
  }

  create() {
    this.accountService.create(this.tokenFormControl.value);
  }
}
