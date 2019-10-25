import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationGuard } from '../../guards/authorization.guard';


const routes: Routes = [
  {
    path: 'product',
    canActivate: [AuthorizationGuard],
    loadChildren: () => import('../product/product.module').then(m => m.ProductModule),
  },
  {
    path: 'order',
    canActivate: [AuthorizationGuard],
    loadChildren: () => import('../order/order.module').then(m => m.OrderModule),
  },
  {
    path: 'sign-in',
    loadChildren: () => import('../sign-in/sign-in.module').then(m => m.SignInModule),
  },
  {
    path: 'home',
    canActivate: [AuthorizationGuard],
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: 'home',
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
