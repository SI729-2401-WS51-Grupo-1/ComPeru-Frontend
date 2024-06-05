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
//import { OrderCreateAndEditComponent } from "../../components/order-create-and-edit/order-create-and-edit.component";
import { NgClass } from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-order-management',
  standalone: true,
  // Declare imports
  imports: [MatPaginator, MatSort, MatSortModule, MatIconModule, MatInputModule, /*OrderCreateAndEditComponent*/ MatTableModule, NgClass, RouterLink],
  templateUrl: './orders-management.component.html',
  styleUrl: './orders-management.component.css'
})

export class OrdersManagementComponent implements OnInit, AfterViewInit{

  // Attributes
  orderData: Order;
  // Table
  dataSource!:MatTableDataSource<any>;
  // Table Columns
  displayedColumns: string[] = ['id', 'userId', 'productId', 'shippingAddress', 'orderDate', 'orderStatus', 'totalPrice' ];
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  isEditMode: boolean;

  // Constructor
  constructor(private ordersService: OrdersService){
    this.isEditMode = false;
    this.orderData = {} as Order;
    this.dataSource = new MatTableDataSource<any>();
  }

  /*private resetEditState(): void{
    this.isEditMode = false;
    this.orderData = {} as Order;
  }*/

  // CRUD methods
  private getAllorders() {
    this.ordersService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  };


  // UI Event Handlers


  // Lifecycle Hooks
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllorders();
  }


}
