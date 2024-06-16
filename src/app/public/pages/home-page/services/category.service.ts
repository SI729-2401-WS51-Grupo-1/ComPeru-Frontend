import { Injectable } from '@angular/core';
import {BaseService} from "../../../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../../../shared/model/category.entity";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/categories';
  }
}
