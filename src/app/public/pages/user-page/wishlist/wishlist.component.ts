import { Component, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { Product} from "../../../../shared/model/product.entity";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {CartService} from "../cart/services/cart.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  standalone: true,
  imports: [
    NgForOf,
    MatCard,
    MatCardModule,
    MatButton,
    NgOptimizedImage,
    RouterLink,
    NgIf,
    MatIcon
  ],
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  wishlistItemCount: number | undefined;
  addedToCart:boolean;
  constructor(private wishlistService: WishlistService,private cartService:CartService,private router: Router) {
    this.addedToCart=false;

  }

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe(items => {
      this.wishlist = items;
      this.wishlistItemCount = items.length;
      console.log('Wishlist updated:', this.wishlist);
    });
  }
  removeFromWishlist(product: Product) {
    this.wishlistService.removeFromWishlist(product);
    this.wishlistService.getWishlist().subscribe(items => {
      this.wishlist = items;
    });
  }

  addToCar(product: Product){
    this.addedToCart = !this.addedToCart;
    this.cartService.addToCart(product,1);
  }
  viewMore(product: Product){
    this.router.navigateByUrl(`users/user-product-detail/${product.id}`);
  }
  removeToCart(product:Product){
    this.addedToCart = !this.addedToCart;
    this.cartService.removeFromCart(product.id);
  }
}
