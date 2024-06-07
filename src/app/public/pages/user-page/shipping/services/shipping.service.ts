import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private url = 'http://localhost:3000/shipping';

  constructor(private http: HttpClient) { }

  createShipping(data: any) {
    return this.http.post(this.url, data);
  }
}
