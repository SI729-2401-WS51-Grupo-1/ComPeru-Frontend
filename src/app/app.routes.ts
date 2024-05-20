import { Routes } from '@angular/router';
import {UserPageComponent} from "./public/pages/user-page/user-page.component";
import {EntrepreneurPageComponent} from "./public/pages/entrepreneur-page/entrepreneur-page.component";
import {ProductsManagementComponent} from "./admin-products/pages/products-management/products-management.component";
import {SalesManagementComponent} from "./admin-sales/pages/sales-management/sales-management.component";
import {ProductDetailComponent} from "./admin-products/components/product-detail/product-detail.component";

export const routes: Routes = [
  {path: 'users',component: UserPageComponent},
  {path: 'entrepreneur', component: EntrepreneurPageComponent,
  children:[
    {path:'products',component:ProductsManagementComponent
    },
    {path:'sales',component:SalesManagementComponent},
    {path:'products/:productId', component:ProductDetailComponent}
  ]
  },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];
