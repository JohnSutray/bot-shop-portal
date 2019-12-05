import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private readonly authorizationService: AuthorizationService,
  ) { }

  get botName(): string {
    return this.authorizationService.botName;
  }
}
