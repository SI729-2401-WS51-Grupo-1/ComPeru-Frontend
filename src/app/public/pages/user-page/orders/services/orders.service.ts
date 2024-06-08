// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Product} from "../../../../../shared/model/product.entity";

export interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: Date;
  items: {
    name: string;
    price: number;
    imageUrl: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable();
  private orders: Order[] = [];

  addOrder(order: Order): void {
    order.id = this.orders.length + 1;  // Simulación de ID incremental
    order.createdAt = new Date();  // Asigna la fecha de creación
    this.orders.push(order);
    this.ordersSubject.next(this.orders);
  }

  updateOrderStatus(orderId: number, newStatus: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      this.ordersSubject.next(this.orders);
    }
  }
}
