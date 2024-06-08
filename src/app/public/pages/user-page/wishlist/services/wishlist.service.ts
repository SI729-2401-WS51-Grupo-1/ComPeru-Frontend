import { Injectable } from '@angular/core';
import { Product } from "../../../../../shared/model/product.entity";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Product[] = [];
  private wishlistSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  addToWishlist(product: Product) {
    const productExistsInWishlist = this.wishlist.some(wishlistProduct => wishlistProduct.id === product.id);

    if (!productExistsInWishlist) {
      this.wishlist.push(product);
      this.wishlistSubject.next(this.wishlist);
      console.log('Product added to wishlist:', product);
    }
  }

  getWishlist() {
    return this.wishlistSubject.asObservable();
  }

  removeFromWishlist(product: Product) {
    this.wishlist = this.wishlist.filter((p) => p.id !== product.id);
    this.wishlistSubject.next(this.wishlist);
  }
  getWishlistItemCount(): number {
    return this.wishlist.length;
  }
}
