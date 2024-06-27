import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../../../shared/services/products.service";
import { Product } from '../../../shared/model/product.entity';
import {WishlistService} from "../../../public/pages/user-page/wishlist/services/wishlist.service";
import {CartService} from "../../../public/pages/user-page/cart/services/cart.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatButton,
    MatCardActions,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon,
    MatIconButton,
    MatCard,
    FormsModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  selectedQuantity: number = 1; // Nueva propiedad para almacenar la cantidad seleccionada

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router
) {
    this.product = {};
  }

  addToWishlist() {
    this.wishlistService.addToWishlist(this.product);
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.selectedQuantity); // Envía la cantidad seleccionada al carrito
  }


  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId !== null) {
      this.productsService.getProductById(Number(productId)).subscribe((product: Product) => {
        this.product = product;
      });
    }
  }

  backProducts() {
    this.router.navigateByUrl('/users/product-page/Laptops');
  }
}
