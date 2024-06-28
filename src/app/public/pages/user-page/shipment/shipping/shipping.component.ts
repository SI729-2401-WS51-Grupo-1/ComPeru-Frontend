import { Component } from '@angular/core';
import {Shipment} from "../model/shipment";
import {AuthenticationService} from "../../../../../iam/services/authentication.service";
import {ShipmentService} from "../services/shipment.service";
import {FormsModule, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {MatCard} from "@angular/material/card";

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [
    FormsModule,
    MatCard
  ],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.css'
})
export class ShippingPageComponent {
  userId:number=0;
  isSignedIn: boolean = false;
  shipment:Shipment;

  constructor(private authenticationService:AuthenticationService,private shippingService: ShipmentService, private router: Router) {
    this.shipment={} as Shipment;
    this.authenticationService.isSignedIn.subscribe(
      (isSignedIn) => this.isSignedIn = isSignedIn
    );
    if(this.isSignedIn){
      this.authenticationService.currentUserId.subscribe((userId)=>this.userId = userId);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // this.shippingService.create(form.value).subscribe(() => {
      //   this.router.navigate(['/users/payment-form']);
      // });
      this.shipment.userId = this.userId;
      console.log(this.shipment);
      this.shippingService.create(this.shipment).subscribe(response => {
        console.log('Review created successfully', response);
        this.router.navigateByUrl('/final-payment');
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}

