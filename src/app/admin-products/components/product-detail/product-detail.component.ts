import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../services/products.service";
import {Product} from "../../../shared/model/product.entity";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  productId: string | null = null;
  product: Product;

  constructor(private _route:ActivatedRoute, private productService: ProductsService) {
    this.product={} as Product;
  }

  loadProductDetails(id:string){
    this.productService.getById(id).subscribe((response:any)=>{
      this.product=response;
    })
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.productId = params['productId'];
      if (this.productId) {
        this.loadProductDetails(this.productId);
      }
    });
  }
}
