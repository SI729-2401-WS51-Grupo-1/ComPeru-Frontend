import { Routes } from '@angular/router';
import {UserPageComponent} from "./public/pages/user-page/user-page.component";
import {EntrepreneurPageComponent} from "./public/pages/entrepreneur-page/entrepreneur-page.component";
import {ProductsManagementComponent} from "./admin-products/pages/products-management/products-management.component";
import {ProductDetailComponent} from "./admin-products/components/product-detail/product-detail.component";
import {OrdersManagementComponent} from "./admin-orders/pages/orders-management/orders-management.component";

export const routes: Routes = [
  {path: 'users',component: UserPageComponent},
  {path: 'entrepreneur', component: EntrepreneurPageComponent,
  children:[
    {path:'products',component:ProductsManagementComponent
    },
    {path:'orders',component:OrdersManagementComponent},
    {path:'products/:productId', component:ProductDetailComponent}
  ]
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];
