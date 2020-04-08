import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { ThemePalette } from '@angular/material/core';

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

  @Output() buttonClick = new EventEmitter<Event>();
  @Input() type: 'simple' | 'stroked' | 'raised' | 'fab' | 'icon' | 'mini-fab' = 'simple';
  @Input() icon: string;
  @Input() color: ThemePalette = undefined;
  @Input() disabled: boolean;
  @Input() buttonClass = '';

  @HostBinding('class.flex-row') flexRowForHost = true;
}
