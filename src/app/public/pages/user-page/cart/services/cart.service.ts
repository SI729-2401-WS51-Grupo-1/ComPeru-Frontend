// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from "../../../../../shared/model/product.entity";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  private forOrders = new BehaviorSubject<any[]>([]);
  forOrders$=this.forOrders.asObservable();

/*  addToCart(product: Product,  quantity: number) {
    this.items.push(product);
    this.cart.next(this.items);
  }*/

  addToCart(product: Product, quantity: number) { // Acepta la cantidad como un segundo argumento
    for(let i = 0; i < quantity; i++) {
      this.items.push(product);
    }
    this.cart.next(this.items);
  }

  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.id !== productId);
    this.cart.next(this.items);
  }

  getCartItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.cart.next(this.items);
  }
  getCartItemCount(): number {
    return this.items.length;
  }

  addForOrders( newProducts:any[]){
    this.forOrders.next(newProducts);
    console.log("los recibi", this.forOrders);
  }
}
