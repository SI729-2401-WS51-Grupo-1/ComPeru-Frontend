import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Component, inject, Input} from '@angular/core';
import { CheckoutService} from "./services/checkout.service";
import { CartStore } from "../../../../shared/store/shopping-cart.store";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {CartService} from "../cart/services/cart.service";
import {Product} from "../../../../shared/model/product.entity";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe, MatHeaderRow, MatRow, MatButton, MatIconButton, MatCell, MatIcon, MatHeaderCell, MatColumnDef, MatTable, MatHeaderCellDef, MatCellDef, NgIf, MatHeaderRowDef, MatRowDef, MatListItem, MatLine, MatList, NgForOf, MatCard, MatCardActions, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle, RouterLink],
  templateUrl: './checkout.component.html',
})
export default class CheckoutComponent {
  cartItems: Product[] = [];
  total: number = 0;
  //@Input() product: Product | undefined;
  private router: any;

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  checkout() {
    // Lógica para procesar el pago
    alert('Checkout complete!');
    this.cartService.clearCart();
  }



  ngOnInit() {
    this.cartService.cart$.subscribe(items => this.cartItems = items);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }


}
