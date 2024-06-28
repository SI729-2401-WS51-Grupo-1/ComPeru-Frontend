import {Component, HostListener, OnInit} from '@angular/core';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FilterProductUserComponent} from "../../../filter-product-user/filter-product-user.component";
import {
  ListProductsViewComponent
} from "../../../user-products/components/list-products-view/list-products-view.component";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgModule} from "@angular/core";
import {NgIf} from "@angular/common";
import { CartService} from "./cart/services/cart.service";
import {WishlistService} from "./wishlist/services/wishlist.service";
import {MatBadgeModule} from "@angular/material/badge";
import {
  AuthenticationSectionComponent
} from "../../../iam/components/authentication-section/authentication-section.component";
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {UsersService} from "../../../admin-products/services/users.service";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, MatFormField, MatInput,
    FilterProductUserComponent, ListProductsViewComponent, RouterLink, RouterOutlet,
    NgIf, RouterLinkActive, MatBadgeModule, AuthenticationSectionComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {
  visibleFilterPanel: boolean;
  cartItemCount: number | undefined;
  wishlistItemCount: number | undefined;
  currentUserName: string = '';
  isSignedIn: boolean = false;
  userId:number=0;
  role:string='';
  constructor(private router: Router,private cartService: CartService, private wishlistService: WishlistService,private authenticationService: AuthenticationService,
              private userService:UsersService) {
    this.visibleFilterPanel = window.innerWidth >= 1159;
    this.authenticationService.currentUsername.subscribe(
      (username) => this.currentUserName = username
    );
    this.authenticationService.isSignedIn.subscribe(
      (isSignedIn) => this.isSignedIn = isSignedIn
    );
    if(this.isSignedIn){
      this.authenticationService.currentUserId.subscribe((userId)=>this.userId = userId);
      this.userService.getById(this.userId).subscribe((user)=> this.role = user.roles[0] );
    }
  }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = items.length;
    });

    this.wishlistService.getWishlist().subscribe(items => {
      this.wishlistItemCount = items.length;
    });
  }
  onProductsManagement(){
    this.router.navigateByUrl('/entrepreneur/products');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.visibleFilterPanel = window.innerWidth >= 1159; // Ajusta este valor según tus necesidades
  }
  openFilterPanel(){
    this.visibleFilterPanel = !this.visibleFilterPanel;
  }
}
