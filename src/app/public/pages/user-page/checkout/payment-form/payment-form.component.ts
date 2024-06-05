import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatCardTitle} from "@angular/material/card";
import {CartService} from "../../cart/services/cart.service";

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    FormsModule,MatCardTitle,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatCardContent,
    MatCardHeader,
    MatCard
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {
  constructor(private cartService: CartService) {}
  processPayment(form: any) {
    console.log('Processing payment for:', form.value);
    // Aquí agregarías la lógica para interactuar con la API de pagos
  }

  checkout() {
    // Lógica para procesar el pago
    alert('SU PAGO SE REALIZO CON EXITO!');
    this.cartService.clearCart();
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
