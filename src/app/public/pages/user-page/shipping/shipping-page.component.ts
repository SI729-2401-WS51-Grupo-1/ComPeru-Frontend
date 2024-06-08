import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { ShippingService } from './services/shipping.service';
import {MatCard} from "@angular/material/card";
@Component({
  selector: 'app-shipping-page',
  templateUrl: './shipping-page.component.html',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatCard
  ],
  styleUrls: ['./shipping-page.component.css']
})
export class ShippingPageComponent {
  constructor(private shippingService: ShippingService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.shippingService.createShipping(form.value).subscribe(() => {
        this.router.navigate(['/users/payment-form']);
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
