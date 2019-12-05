import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from '../../guards/authorization.guard';


const routes: Routes = [
  {
    path: 'product',
    canActivate: [AuthorizationGuard],
    loadChildren: '../product/product.module#ProductModule',
  },
  {
    path: 'order',
    canActivate: [AuthorizationGuard],
    loadChildren: '../order/order.module#OrderModule',
  },
  {
    path: 'sign-in',
    loadChildren: '../sign-in/sign-in.module#SignInModule',
  },
  {
    path: 'home',
    canActivate: [AuthorizationGuard],
    loadChildren: '../home/home.module#HomeModule',
  },
  {
    path: '**',
    canActivate: [AuthorizationGuard],
    loadChildren: '../home/home.module#HomeModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class RootRoutingModule {
}
