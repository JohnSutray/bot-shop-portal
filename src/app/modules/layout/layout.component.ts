import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { LabelsConstants } from '../../constants/labels.constants';
import { ImageConstants } from '../../constants/image.constants';

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

  get logoImage(): string {
    return this.authorizationService.avatarImage || ImageConstants.BOT_AVATAR_PLACEHOLDER;
  }

  get logoText(): string {
    return this.authorizationService.isSigned
      ? this.authorizationService.botName
      : LabelsConstants.IMPORT_SHOP_PORTAL;
  }
}
