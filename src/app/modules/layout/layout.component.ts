import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { LabelsConstants } from '../../constants/labels.constants';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  readonly LabelsConstants = LabelsConstants;

  constructor(
    private readonly router: Router,
    readonly authorizationService: AuthorizationService,
  ) {
  }

  get logoText(): string {
    return this.authorizationService.isSigned
      ? this.authorizationService.botName
      : LabelsConstants.IMPORT_SHOP_PORTAL;
  }
}
