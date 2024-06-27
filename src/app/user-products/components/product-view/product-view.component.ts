import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {Product} from "../../../shared/model/product.entity";
import {WishlistService} from "../../../public/pages/user-page/wishlist/services/wishlist.service";
import {CartService} from "../../../public/pages/user-page/cart/services/cart.service";
import {Router, RouterLink} from "@angular/router";
import {NgStyle} from "@angular/common";
@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink, NgStyle],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  @Input() product: any;
  isFavorite: boolean = false;
  addedToCart:boolean = false;
  selectedQuantity: number = 1; // Nueva propiedad para almacenar la cantidad seleccionada

  initialColor: string = '#CACECE';
  favoriteColor: string = '#FF8082';
  constructor(private wishlistService: WishlistService, private cartService: CartService, private router: Router) {
    this.product={};
  }

  addToWishlist() {
    this.isFavorite=!this.isFavorite;
    if(this.isFavorite){
      this.wishlistService.addToWishlist(this.product);
    }
    else{
      this.wishlistService.removeFromWishlist(this.product);
    }
  }

  addToCart() {
    this.addedToCart = !this.addedToCart;
    this.cartService.addToCart(this.product,this.selectedQuantity);
  }

  removeToCart(){
    this.addedToCart = !this.addedToCart;
    this.cartService.removeFromCart(this.product.id);
  }
  redirectToViewMore() {
    this.router.navigateByUrl(`users/user-product-detail/${this.product.id}`); // Usa navigateByUrl para la navegación
  }
}
