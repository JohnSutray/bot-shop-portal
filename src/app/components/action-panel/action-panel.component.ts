import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss'],
})
export class ActionPanelComponent {
  @Input() readonly actionIcon: string;
  @Input() readonly actionIconSvg: string;
  @Input() readonly actionText: string;
  @Input() readonly disabled = false;

  @Output() readonly action = new Subject<void>();
}
