import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {Product} from "../../../shared/model/product.entity";
import {WishlistService} from "../../../public/pages/user-page/wishlist/services/wishlist.service";
import {CartService} from "../../../public/pages/user-page/cart/services/cart.service";
import {Router, RouterLink} from "@angular/router";
@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  @Input() product: Product;
  selectedQuantity: number = 1; // Nueva propiedad para almacenar la cantidad seleccionada

  constructor(private wishlistService: WishlistService, private cartService: CartService, private router: Router) {
    this.product={} as Product;
  }

  addToWishlist() {
    this.wishlistService.addToWishlist(this.product);
  }

  addToCart() {
    this.cartService.addToCart(this.product,this.selectedQuantity);
  }


  redirectToViewMore() {
    this.router.navigateByUrl(`users/product-details/${this.product.id}`); // Usa navigateByUrl para la navegación
  }
}
