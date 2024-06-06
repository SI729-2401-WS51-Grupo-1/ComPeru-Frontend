import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../shared/services/base.service";
import {User} from "../../shared/model/user.interface"
@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/users';
  }
}
