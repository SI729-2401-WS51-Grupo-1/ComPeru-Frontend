import { Routes } from '@angular/router';
import {UserPageComponent} from "./public/pages/user-page/user-page.component";
import {EntrepreneurPageComponent} from "./public/pages/entrepreneur-page/entrepreneur-page.component";
import {ProductsManagementComponent} from "./admin-products/pages/products-management/products-management.component";
import {ProductDetailComponent} from "./admin-products/components/product-detail/product-detail.component";
import {OrdersManagementComponent} from "./admin-orders/pages/orders-management/orders-management.component";
// <<<<<<< HEAD
// // <<<<<<< HEAD
// // import {ShoppingCartComponent} from "./shopping-cart/components/shopping-cart/shopping-cart.component";
// // import {ListProductsComponent} from "./list-favorites/components/list-products/list-products.component";
// // import {UserComponent} from "./public/pages/user/user.component";
// // import {UserProductDetailComponent} from "./user-products/components/user-product-detail/user-product-detail.component";
// // import {HomeComponent} from "./home/components/home/home.component";
// // import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
// //
// // export const routes: Routes = [
// //   {path: 'users',component: UserComponent,
// //   children:[
// //     {path: '', component: UserPageComponent },
// //     {path: 'cart', component: ShoppingCartComponent},
// //     {path: 'favorites', component: ListProductsComponent},
// //     {path: 'product/:Id', component: UserProductDetailComponent }
// //   ]},
// //
// //   {path: 'entrepreneur', component: EntrepreneurPageComponent,
// //
// // =======
// =======
//
// >>>>>>> f91f8bde22b23820b78fe826903857bc8721f3f6
import {WishlistComponent} from "./public/pages/user-page/wishlist/wishlist.component";
// import {CheckoutComponent} from "./public/pages/user-page/checkout/checkout.component";
import {CheckoutComponent} from "./public/pages/user-page/checkout/checkout/checkout.component";
import {PaymentFormComponent} from "./public/pages/user-page/checkout/forms-page-pay/payment-form/payment-form.component";
import {
  FinalPagePaymentComponent
} from "./public/pages/user-page/checkout/forms-page-pay/final-page-payment/final-page-payment.component";
import {OrdersComponent} from "./public/pages/user-page/orders/orders.component";
import {StoreChooseComponent} from "./public/pages/auth-store/store-choose/store-choose.component";
import {LoginStoreComponent} from "./public/pages/auth-store/auth-page-store/login-store/login-store.component";
import {
  RegisterStoreComponent
} from "./public/pages/auth-store/auth-page-store/register-store/register-store.component";
import {ProductDetailsComponent} from "./user-products/components/product-details/product-details.component";
import {ShippingPageComponent} from "./public/pages/user-page/shipping/shipping-page.component";
// <<<<<<< HEAD
// import {HomeComponent} from "./home/components/home/home.component";
// =======
// >>>>>>> f91f8bde22b23820b78fe826903857bc8721f3f6
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {UserProductDetailComponent} from "./user-products/components/user-product-detail/user-product-detail.component";
import {HomeComponent} from "./public/pages/home-page/home/home.component";
import {ListProductsViewComponent} from "./user-products/components/list-products-view/list-products-view.component";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";
import {authenticationGuard} from "./iam/services/authentication.guard";

export const routes: Routes = [
  {path: 'users', component: UserPageComponent,
  children:[
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home',component: HomeComponent},
    {path:'wishlist',component:WishlistComponent,canActivate: [authenticationGuard]},
    {path: 'checkout', component: CheckoutComponent,canActivate: [authenticationGuard]},
    {path: 'product-page/:category', component: ListProductsViewComponent},
    {path: 'payment-form', component: PaymentFormComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'stores-choose', component: StoreChooseComponent},
    {path: 'auth/login-store', component: LoginStoreComponent},
    {path: 'auth/register-store', component: RegisterStoreComponent},
    { path: 'product-details/:id', component: ProductDetailsComponent },
    {path: 'shipping-page', component: ShippingPageComponent,canActivate: [authenticationGuard]},
    {path: 'user-product-detail/:id', component: UserProductDetailComponent}
  ]
  },
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {path: 'final-payment', component: FinalPagePaymentComponent,canActivate: [authenticationGuard]},
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent},

  {path: 'entrepreneur', component: EntrepreneurPageComponent,
  children:[
    {path:'products',component:ProductsManagementComponent
    },
    {path:'orders',component:OrdersManagementComponent},
    {path:'products/:productId', component:ProductDetailComponent}
  ]
  },
// <<<<<<< HEAD
//   { path: 'home', component: HomeComponent },
// =======

  // Root path
  { path: '', redirectTo: 'users', pathMatch: 'full' },

  // Path for not Support Pages
  { path: '**', component: PageNotFoundComponent }
];
