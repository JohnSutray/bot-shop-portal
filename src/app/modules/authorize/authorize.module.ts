import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BotManagementService } from '../../services/bot-management.service';
import { AuthorizeInterceptor } from '../../interceptors/authorize.interceptor';
import { AuthorizationGuard } from '../../guards/authorization.guard';


@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    BotManagementService,
    AuthorizationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizeInterceptor,
      multi: true,
    },
  ],
})
export class AuthorizeModule {
}
