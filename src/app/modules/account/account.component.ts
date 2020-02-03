import { Component } from '@angular/core';
import { AccountClient } from '../../services/account.client.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { InfoDialogService } from '../../services/info-dialog.service';
import { InfoDialogData } from '../../models/info-dialog-data.model';
import { AuthorizationService } from '../../services/authorization.service';
import { LabelsConstants } from '../../constants/labels.constants';
import { ValidationConstants } from '../../constants/validation.constants';
import { stubPipeOnError } from '../../utils/rxjs.utils';

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
    private readonly accountClient: AccountClient,
    private readonly infoDialogService: InfoDialogService,
    private readonly router: Router,
  ) {
  }

  tokenFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(46),
  ]);

  signIn() {
    this.authorizationService.signIn(this.tokenFormControl.value).pipe(
      stubPipeOnError,
      tap(() => this.router.navigate(['/home'])),
    ).subscribe();
  }

  create() {
    this.accountClient.create(this.tokenFormControl.value).pipe(
      stubPipeOnError,
    ).subscribe(this.openAccountCreatedDialog);
  }

  remove() {
    this.accountClient.remove().pipe(
      stubPipeOnError,
    ).subscribe(this.openAccountRemovedDialog);
  }

  openAccountRemovedDialog = (): void => this.infoDialogService.open(
    new InfoDialogData(LabelsConstants.ACCOUNT_REMOVED),
  );

  openAccountCreatedDialog = (): void => this.infoDialogService.open(
    new InfoDialogData(LabelsConstants.ACCOUNT_CREATED),
  );
}
