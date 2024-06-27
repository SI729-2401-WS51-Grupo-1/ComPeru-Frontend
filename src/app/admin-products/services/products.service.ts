import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BaseService} from "../../shared/services/base.service";
import {Product} from "../../shared/model/product.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<any>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/products';
  }
// Get All Resources
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Resource by ID
  getProductById(id: any): Observable<any> {
    return this.http.get<any>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
