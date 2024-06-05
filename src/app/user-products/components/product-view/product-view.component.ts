import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {Product} from "../../../shared/model/product.entity";
import {WishlistService} from "../../../public/pages/user-page/wishlist/services/wishlist.service";
import {CartService} from "../../../public/pages/user-page/cart/services/cart.service";
@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  @Input() product: Product;

  constructor(private wishlistService: WishlistService, private cartService: CartService) {
    this.product={} as Product;
  }

  addToWishlist() {
    this.wishlistService.addToWishlist(this.product);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
