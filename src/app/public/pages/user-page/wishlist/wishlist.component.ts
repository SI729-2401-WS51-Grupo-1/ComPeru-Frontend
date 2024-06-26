import { Component, OnInit } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { Product} from "../../../../shared/model/product.entity";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatCard, MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {RouterLink} from "@angular/router";

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
    NgIf
  ],
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: Product[] = [];
  wishlistItemCount: number | undefined;

  constructor(private wishlistService: WishlistService) {}

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
}
