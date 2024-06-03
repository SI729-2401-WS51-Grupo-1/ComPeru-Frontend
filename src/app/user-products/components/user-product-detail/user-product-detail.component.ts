import {Component, OnInit} from '@angular/core';
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProductsService} from "../../../admin-products/services/products.service";
import {Product} from "../../../shared/model/product.entity";
import {CurrencyPipe, NgStyle} from "@angular/common";
import {UsersService} from "../../../admin-products/services/users.service";
import {User} from "../../../shared/model/user.entity";
import {ListReviewsComponent} from "../../../review-product/components/list-reviews/list-reviews.component";

@Component({
  selector: 'app-user-product-detail',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    RouterLink,
    MatFabButton,
    CurrencyPipe,
    NgStyle,
    MatButton,
    ListReviewsComponent
  ],
  templateUrl: './user-product-detail.component.html',
  styleUrl: './user-product-detail.component.css'
})
export class UserProductDetailComponent implements OnInit{
  isFavorite: boolean = false;
  productData: Product;
  products: Product[];
  productId: string | null = null;
  userData: User;

  // Define the initial and favorite colors
  initialColor: string = '#CACECE';
  favoriteColor: string = '#f44336';
  constructor(private _route:ActivatedRoute,private productService:ProductsService, private userService:UsersService) {

    this.productData={} as Product;
    this.products = [];
    this.userData = {} as User;
  }



  private getProduct(id:string){
    this.productService.getById(id).subscribe((response:any)=>{
      this.productData=response;
      this.getSeller(this.productData.idEntrepreneur.toString());
    })
  }

  private getSeller(id:string){
    this.userService.getById(id).subscribe((response:any)=>{
      this.userData=response;
    })
  }


  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.productId = params['Id'];
      if (this.productId) {
        this.getProduct(this.productId);

      }
    });
  }


}
