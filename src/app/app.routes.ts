import { Routes } from '@angular/router';
import {UserPageComponent} from "./public/pages/user-page/user-page.component";
import {EntrepreneurPageComponent} from "./public/pages/entrepreneur-page/entrepreneur-page.component";
import {ProductsManagementComponent} from "./admin-products/pages/products-management/products-management.component";
import {ProductDetailComponent} from "./admin-products/components/product-detail/product-detail.component";
import {OrdersManagementComponent} from "./admin-orders/pages/orders-management/orders-management.component";
import {ShoppingCartComponent} from "./shopping-cart/components/shopping-cart/shopping-cart.component";
import {ListProductsComponent} from "./list-favorites/components/list-products/list-products.component";
import {UserComponent} from "./public/pages/user/user.component";
import {UserProductDetailComponent} from "./user-products/components/user-product-detail/user-product-detail.component";
import {HomeComponent} from "./home/components/home/home.component";

export const routes: Routes = [
  {path: 'users',component: UserComponent,
  children:[
    // { path: '', redirectTo: 'users', pathMatch: 'full' },
    {path: '', component: UserPageComponent },
    {path: 'cart', component: ShoppingCartComponent},
    {path: 'favorites', component: ListProductsComponent},
    {path: 'product/:Id', component: UserProductDetailComponent }
  ]},

  {path: 'entrepreneur', component: EntrepreneurPageComponent,

  children:[
    {path:'products',component:ProductsManagementComponent
    },
    {path:'orders',component:OrdersManagementComponent},
    {path:'products/:productId', component:ProductDetailComponent}
  ]
  },
  { path: 'home', component: HomeComponent },
];
