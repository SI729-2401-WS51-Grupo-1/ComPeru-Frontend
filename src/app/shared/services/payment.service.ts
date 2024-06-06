import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Product } from "../model/product.entity";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripePromise = loadStripe('pk_test_51PNQAUP2oKTRLYpMfvLEo25OCEdo4cSEzJOIEd1rwCr0xw1kvQjFyQgit03xplbGsnso5H5naFdL53cuq3uhaWmb00tgk6BSYq');

  async redirectToCheckout(cartItems: Product[]) {
    const stripe = await this.stripePromise;

    if (!stripe) {
      console.error('Stripe failed to load');
      return;
    }

    const lineItems = cartItems.map(item => ({
      price: item.stripePriceId,
      quantity: 1
    }));

    const { error } = await stripe.redirectToCheckout({
      lineItems,
      mode: 'payment',
      successUrl: window.location.origin + '/success',
      cancelUrl: window.location.origin + '/cancel',
    });

    if (error) {
      console.error(error.message);
    }
  }
}
