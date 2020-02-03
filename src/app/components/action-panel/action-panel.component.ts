import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent {
  @Input() actionIcon: string;
  @Input() actionIconSvg: string;
  @Input() actionText: string;
}
