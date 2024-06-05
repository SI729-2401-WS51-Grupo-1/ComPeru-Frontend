import { Injectable } from '@angular/core';

// Imports for http

import { HttpClient } from "@angular/common/http";

// Keep common base service or change
import { BaseService } from "../../shared/services/base.service";

// Use own model or change other
// Define order entity
//import { Order } from "../model/order.entity";
import { Order } from "../../shared/model/order.entity";

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService<Order>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/orders';
  }
}
