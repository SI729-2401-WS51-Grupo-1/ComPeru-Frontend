import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Brand} from "../model/brand.entity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService<Brand>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/brands';
  }}
