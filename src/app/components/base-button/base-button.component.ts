import { Component, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.scss'],
})
export class BaseButtonComponent {
  readonly simpleButton = 'simple';
  readonly strokedButton = 'stroked';
  readonly raisedButton = 'raised';
  readonly fabButton = 'fab';
  readonly miniFabButton = 'mini-fab';
  readonly iconButton = 'icon';

  @Output() buttonClick = new Subject<void>();
  @Input() type: 'simple' | 'stroked' | 'raised' | 'fab' | 'icon' | 'mini-fab' = 'simple';
  @Input() icon: string;
  @Input() color: 'primary' | 'accent' | 'warn' | '' = '';
  @Input() disabled = false;
  @Input() buttonClass = '';

  @HostBinding('class.flex-row') flexRowForHost = true;
}
