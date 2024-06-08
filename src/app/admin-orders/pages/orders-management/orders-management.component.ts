import { Component } from '@angular/core';
// Imports for component
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';

// Material imports
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";

// Order imports
import { OrdersService } from "../../services/orders.service";
import { Order } from "../../../shared/model/order.entity";
import { OrderCreateAndEditComponent } from "../../components/order-create-and-edit/order-create-and-edit.component";

import { NgClass } from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-order-management',
  standalone: true,
  // Declare imports
  imports: [MatPaginator, MatSort, MatSortModule, MatIconModule, MatInputModule, OrderCreateAndEditComponent, MatTableModule, NgClass, RouterLink, MatExpansionModule],
  templateUrl: './orders-management.component.html',
  styleUrl: './orders-management.component.css'
})

export class OrdersManagementComponent implements OnInit, AfterViewInit{

  // Attributes
  orderData: Order;
  // Table
  dataSource!:MatTableDataSource<any>;
  // Table Columns
  displayedColumns: string[] = ['id', 'userId', 'productId', 'shippingAddress', 'orderDate', 'orderStatus', 'totalPrice', 'actions'];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  // Constructor
  constructor(private ordersService: OrdersService){
    this.isEditMode = false;
    this.orderData = {} as Order;
    this.dataSource = new MatTableDataSource<any>();
  }

  private resetEditState(): void{
    this.isEditMode = false;
    this.orderData = {} as Order;
  }

  // CRUD methods
  private getAllorders() {
    this.ordersService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };

  private createOrder() {
    this.ordersService.create(this.orderData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((order: Order) => { return order; });
    });
  };

  private updateOrder() {
    let orderToUpdate = this.orderData;
    this.ordersService.update(this.orderData.id, orderToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((order: Order) => {
        if (order.id === response.id) {
          return response;
        }
        return order;
      });
    });
  };

  private deleteOrder(orderId: number) {
    this.ordersService.delete(orderId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((order: Order) => {
        return order.id !== orderId ? order : false;
      });
    });
  };


  // UI Event Handlers
  onEditItem(element: Order) {
    this.isEditMode = true;
    this.orderData = element;
  }

  onDeleteItem(element: Order) {
    this.deleteOrder(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllorders();
  }

  onOrderAdded(element: Order) {
    this.orderData = element;
    this.createOrder();
    this.resetEditState();
  }

  onOrderUpdated(element: Order) {
    this.orderData = element;
    this.updateOrder();
    this.resetEditState();
  }


  // Lifecycle Hooks
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllorders();
  }


}
