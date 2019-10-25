import { Component } from '@angular/core';
import { BotManagementService } from '../../services/bot-management.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { InfoDialogService } from '../../services/info-dialog.service';
import { InfoDialogData } from '../../models/info-dialog-data.model';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly botManagementService: BotManagementService,
    private readonly infoDialogService: InfoDialogService,
    private readonly router: Router,
  ) {
  }

  tokenFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(46),
    Validators.maxLength(46),
  ]);

  signIn() {
    this.authorizationService.signIn(this.tokenFormControl.value).pipe(
      tap(result => result && this.router.navigate(['/home'])),
    ).subscribe();
  }

  create() {
    this.botManagementService.create(this.tokenFormControl.value)
      .subscribe(result => result && this.infoDialogService.open(
        new InfoDialogData('Бот успешно создан'),
      ));
  }

  remove() {
    this.botManagementService.remove(this.tokenFormControl.value)
      .subscribe(result => result && this.infoDialogService.open(
        new InfoDialogData('Бот успешно удалён'),
      ));
  }
}
