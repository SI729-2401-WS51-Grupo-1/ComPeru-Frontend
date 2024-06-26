import {Component, OnInit} from '@angular/core';
import {Order, OrderService} from "./services/orders.service";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCardSubtitle,MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatCardSubtitle, MatCardTitle,
    MatCard,
    MatList,
    MatCardContent,
    NgIf,
    MatListItem,
    MatCardHeader,
    MatCardActions,
    CurrencyPipe,
    MatButton,
    MatCardImage,
    NgForOf, DatePipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.orders$.subscribe(orders => {
      this.orders = orders;
    });
  }

  updateStatus(orderId: number, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus);
  }
}
