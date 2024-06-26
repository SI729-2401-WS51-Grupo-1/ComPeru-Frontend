import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Offer} from "../../shared/model/offer.entity";
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class OfferService extends BaseService<Offer>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint='/products'
  }
}
