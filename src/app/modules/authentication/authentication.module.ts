import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from '../../interceptors/authentication.interceptor';
import { AuthenticationGuard } from '../../guards/authentication.guard';


@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
})
export class AuthenticationModule {
}
