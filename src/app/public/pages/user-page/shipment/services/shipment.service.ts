import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BaseService} from "../../../../../shared/services/base.service";
import {Shipment} from "../model/shipment";

@Injectable({
  providedIn: 'root'
})
export class ShipmentService extends BaseService<any>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/shipments';
  }

}
