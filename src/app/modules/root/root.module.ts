import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingOverlayModule } from '../../components/loading-overlay/loading-overlay.module';
import { InfoDialogModule } from '../../components/info-dialog/info-dialog.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { LayoutModule } from '../layout/layout.module';
import { BASE_PATH } from '../../services/generated/variables';
import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [
    RootComponent,
  ],
  imports: [
    RootRoutingModule,
    InfoDialogModule,
    AuthenticationModule,
    BrowserModule,
    BrowserAnimationsModule,
    LoadingOverlayModule,
    LayoutModule,
  ],
  bootstrap: [
    RootComponent,
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: environment.apiUrl,
    },
  ],
})
export class RootModule {
}
