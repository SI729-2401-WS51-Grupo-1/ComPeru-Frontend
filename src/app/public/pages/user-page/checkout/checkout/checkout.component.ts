import {Component, OnInit} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {Router, RouterModule} from "@angular/router";
import {Product} from "../../../../../shared/model/product.entity";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CartService} from "../../cart/services/cart.service";
import {OrderService} from "../../orders/services/orders.service";
import {CurrencyPipe} from "@angular/common";
import {MatFormField, MatLabel, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    RouterModule,
    CurrencyPipe,
    MatFormField,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSuffix,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  cartItems: Product[] = [];
  total: number = 0;
  //@Input() product: Product | undefined;
  displayedColumns: string[] = ['image', 'name', 'price','actions'];
  dataSource!:MatTableDataSource<any>;
  maxPriceControl: FormControl;
  quantity:number;
  auxiliaryArray:any[];

  constructor(private fb: FormBuilder,private router: Router, private cartService: CartService, private orderService: OrderService) {
    this.dataSource = new MatTableDataSource<any>();
    this.maxPriceControl = new FormControl(0, [Validators.min(0)]);
    this.quantity=0;
    this.auxiliaryArray=[];

  }

  calculateTotal() {
    this.total = this.dataSource.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  checkout() {
    // Lógica para procesar el pago
    alert('Checkout complete!');
    this.cartService.clearCart();
  }


  ngOnInit() {
    // this.cartService.cart$.subscribe(items => this.cartItems = items);
    this.cartService.cart$.subscribe(items => {
      this.auxiliaryArray=items;
      this.addAttribute();
      this.dataSource.data = this.auxiliaryArray;
      this.calculateTotal();
    });
    console.log(this.dataSource);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  addAttribute(){
    this.auxiliaryArray = this.auxiliaryArray.map(product => ({
      ...product,
      quantity: 1
    }));

  }

  toPayment(){
    console.log('ss');
    this.cartService.addForOrders(this.dataSource.data);
    this.router.navigate(['/users/shipping-page']);
  }
}



