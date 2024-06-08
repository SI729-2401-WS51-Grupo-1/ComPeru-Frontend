import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Offer } from "../../shared/model/offer.entity";

@Injectable({
  providedIn: 'root'
})
export class OfferService extends BaseService<Offer>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/products'
  }
}
