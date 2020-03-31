import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionPanelComponent } from './action-panel.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ActionPanelComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    ActionPanelComponent,
  ],
})
export class ActionPanelModule { }
