import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseTextFieldModule } from '../../components/base-text-field/base-text-field.module';
import { BaseButtonModule } from '../../components/base-button/base-button.module';

@NgModule({
  declarations: [
    AccountComponent,
  ],
  imports: [
    AccountRoutingModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    BaseTextFieldModule,
    BaseButtonModule,
  ],
})
export class AccountModule {
}
