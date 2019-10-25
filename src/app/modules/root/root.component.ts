import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly router: Router,
    readonly authorizationService: AuthorizationService,
  ) {
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon(
      't-bot',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/t-bot.svg')
    );
    this.authorizationService.restoreSignData();
  }

  signOut() {
    this.authorizationService.signOut();
    this.router.navigate(['/sign-in']);
  }
}
