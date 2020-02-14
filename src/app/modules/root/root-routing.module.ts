import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../../guards/authentication.guard';


const routes: Routes = [
  {
    path: 'product',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('../product/product.module').then(m => m.ProductModule),
    data: {
      animation: 'product',
    },
  },
  {
    path: 'order',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('../order/order.module').then(m => m.OrderModule),
  },
  {
    path: 'account',
    loadChildren: () => import('../account/account.module').then(m => m.AccountModule),
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
    data: {
      animation: 'home',
    },
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
