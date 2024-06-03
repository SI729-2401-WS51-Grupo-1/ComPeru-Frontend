import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/services/base.service";
import {Review} from "../../shared/model/review.entity";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService extends BaseService<Review>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/reviews';
  }

}
