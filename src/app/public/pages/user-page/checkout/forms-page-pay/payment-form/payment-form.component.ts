import { Component } from '@angular/core';
import {FormBuilder, FormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle
} from "@angular/material/card";
import {MatCardTitle} from "@angular/material/card";
import {CartService} from "../../../cart/services/cart.service";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Product} from "../../../../../../shared/model/product.entity";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderService, Order } from '../../../orders/services/orders.service';


@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule,
    MatList,
    FormsModule, MatCardTitle,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatCardContent,
    MatCardHeader,
    MatCard, CurrencyPipe, RouterLink, MatCardImage, MatCardSubtitle, MatIcon, MatIconButton, MatList, NgForOf, NgIf, MatCardActions, DatePipe, MatListItem
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {
  orders: Order[] = [];

  paymentForm = this.fb.group({
/*    cardholder: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expiration: ['', Validators.required],
    cvv: ['', Validators.required]*/
  });

  fields = [
    { label: 'Nombre del titular', placeholder: 'Nombre del titular', model: '', name: 'cardholder', error: 'Este campo es requerido' },
    { label: 'Número de tarjeta', placeholder: 'Número de tarjeta', model: '', name: 'cardNumber', error: 'Este campo es requerido' },
    { label: 'Fecha de expiración (MM/AA)', placeholder: 'MM/AA', model: '', name: 'expiration', error: 'Este campo es requerido' },
    { label: 'CVV', placeholder: 'CVV', model: '', name: 'cvv', error: 'Este campo es requerido' }
  ];

  cartItems: Product[] = [];
  total: number = 0;
  constructor(private router:Router, private fb: FormBuilder, private cartService: CartService, private orderService: OrderService) {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }


  checkout(): void {
    alert('SU PAGO SE REALIZO CON EXITO!');
    this.cartService.clearCart();
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  processPayment(): void {
    if (this.paymentForm.valid) {
      console.log('Processing payment for:', this.paymentForm.value);
      const newOrder: Order = {
        id: 0,
        items: this.cartItems,
        total: this.total,
        status: 'Pendiente',
        createdAt: new Date()  // Asigna la fecha de creación aquí
      };
      this.orderService.addOrder(newOrder);
      this.checkout();
      alert('SU PAGO SE REALIZO CON EXITO!');
      this.router.navigate(['/final-payment']);
    } else {
      alert('Por favor completa todos los campos requeridos.');
    }
  }

  updateStatus(orderId: number, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
