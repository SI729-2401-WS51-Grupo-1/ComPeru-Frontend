import { Routes } from '@angular/router';
import {UserPageComponent} from "./public/pages/user-page/user-page.component";
import {EntrepreneurPageComponent} from "./public/pages/entrepreneur-page/entrepreneur-page.component";
import {ProductsManagementComponent} from "./admin-products/pages/products-management/products-management.component";
import {ProductDetailComponent} from "./admin-products/components/product-detail/product-detail.component";
import {OrdersManagementComponent} from "./admin-orders/pages/orders-management/orders-management.component";
import {WishlistComponent} from "./public/pages/user-page/wishlist/wishlist.component";
import {ProductPageComponent} from "./public/pages/user-page/product-page/product-page.component";
import CheckoutComponent from "./public/pages/user-page/checkout/checkout.component";
import {PaymentFormComponent} from "./public/pages/user-page/checkout/forms-page-pay/payment-form/payment-form.component";
import {
  AuthPresentationPageComponent
} from "./public/pages/authentication/user-auth/auth-presentation-page/auth-presentation-page.component";
import {StoresAuthComponent} from "./public/pages/authentication/stores-auth/stores-auth.component";
import {FinalRegisterPageComponent} from "./public/pages/authentication/final-register-page/final-register-page.component";
import {LoginComponent} from "./public/pages/authentication/auth-pages/login/login.component";
import {RegisterComponent} from "./public/pages/authentication/auth-pages/register/register.component";
import {
  FinalPagePaymentComponent
} from "./public/pages/user-page/checkout/forms-page-pay/final-page-payment/final-page-payment.component";
import {OrdersComponent} from "./public/pages/user-page/orders/orders.component";

export const routes: Routes = [
  {path: 'users', component: UserPageComponent,
  children:[
    {path:'wishlist',component:WishlistComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'product-page', component: ProductPageComponent},
    {path: 'payment-form', component: PaymentFormComponent},
    {path: 'auth', component: AuthPresentationPageComponent},
    {path: 'auth/store', component: StoresAuthComponent},
    {path: 'orders', component: OrdersComponent}
  ]
  },
  {path: 'final-payment', component: FinalPagePaymentComponent},
  {path: 'auth/final-page', component: FinalRegisterPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},


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
