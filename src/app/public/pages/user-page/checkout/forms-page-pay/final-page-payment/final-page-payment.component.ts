import { Component } from '@angular/core';
import { CartService } from "../../../cart/services/cart.service";
import { Product } from "../../../../../../shared/model/product.entity";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { RouterLink, Router } from "@angular/router"; // Importa Router
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-final-page-payment',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatIcon,
    MatCardActions,
    RouterLink,
    MatButton
  ],
  templateUrl: './final-page-payment.component.html',
  styleUrls: ['./final-page-payment.component.css'] // Corrige styleUrl a styleUrls
})
export class FinalPagePaymentComponent {

  cartItems: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) { // Inyecta Router aquí
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  processPayment(form: any) {
    console.log('Processing payment for:', form.value);
    // Aquí agregarías la lógica para interactuar con la API de pagos
  }

  checkout() {
    // Lógica para procesar el pago
    alert('SU PAGO SE REALIZO CON EXITO!');
    this.cartService.clearCart();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  regresarInicio() {
    this.router.navigateByUrl('/users/product-page'); // Usa navigateByUrl para la navegación
  }
}
