import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BaseService} from "../../shared/services/base.service";
import {Product} from "../../shared/model/product.entity";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Product>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/products';
  }
}
