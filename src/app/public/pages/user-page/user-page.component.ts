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
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgModule} from "@angular/core";
import {NgIf} from "@angular/common";
import { CartService} from "./cart/services/cart.service";
import {WishlistService} from "./wishlist/services/wishlist.service";
import {MatBadgeModule} from "@angular/material/badge";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, MatFormField, MatInput,
    FilterProductUserComponent, ListProductsViewComponent, RouterLink, RouterOutlet,
    NgIf, RouterLinkActive, MatBadgeModule
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {
  visibleFilterPanel: boolean;
  cartItemCount: number | undefined;
  wishlistItemCount: number | undefined;

  constructor(private cartService: CartService, private wishlistService: WishlistService) {
    this.visibleFilterPanel = window.innerWidth >= 1159;
  }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = items.length;
    });

    this.wishlistService.getWishlist().subscribe(items => {
      this.wishlistItemCount = items.length;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.visibleFilterPanel = window.innerWidth >= 1159;
  }

  openFilterPanel(){
    this.visibleFilterPanel = !this.visibleFilterPanel;
  }
}
