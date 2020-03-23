import { Injectable } from '@angular/core';
import { AccountClient } from './account.client.service';
import { InfoDialogService } from './info-dialog.service';
import { stubPipeOnError } from '../utils/rxjs.utils';
import { InfoDialogData } from '../models/info-dialog-data.model';
import { LabelsConstants } from '../constants/labels.constants';
import { AccountManagementService } from './generated/api/account-management.service';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private readonly accountClient: AccountClient,
    private readonly infoDialogService: InfoDialogService,
    private readonly accountManagementService: AccountManagementService,
  ) {
  }

  removeCurrentAccount() {
    this.accountManagementService.accountDelete()
      .pipe(stubPipeOnError)
      .subscribe(this.openAccountRemovedDialog);
  }

  openAccountRemovedDialog = (): void => this.infoDialogService.open(
    new InfoDialogData(LabelsConstants.ACCOUNT_REMOVED),
  );

  create(token: string) {
    this.accountClient.create(token)
      .pipe(stubPipeOnError)
      .subscribe(this.openAccountCreatedDialog);
  }

  openAccountCreatedDialog = (): void => this.infoDialogService
    .open(new InfoDialogData(LabelsConstants.ACCOUNT_CREATED));
}
