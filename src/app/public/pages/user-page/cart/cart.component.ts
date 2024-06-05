import {Component, Input, OnInit} from '@angular/core';
import { CartService } from "./services/cart.service";
import { PaymentService} from "../../../../shared/services/payment.service";
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Product} from "../../../../shared/model/product.entity";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatLine} from "@angular/material/core";
import {MatList, MatListItem, MatListItemAvatar} from "@angular/material/list";
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: true,
  imports: [
    MatListItemAvatar,
    NgOptimizedImage,
    NgForOf,
    AsyncPipe,
    CurrencyPipe,
    MatButton,
    MatLine,
    MatListItem,
    MatList,
    NgIf,
    MatCardSubtitle,
    MatCardTitle,
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardImage,
    MatIcon,
    MatIconButton
  ],
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  cartItemCount: number | undefined;

  @Input() product: Product;


  constructor(private cartService: CartService) {
    this.product={} as Product;
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  protected readonly it = it;

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }
}
