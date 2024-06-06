import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../../admin-products/services/products.service";
import {Product} from "../../../shared/model/product.entity";
import {ProductViewComponent} from "../product-view/product-view.component";
@Component({
  selector: 'app-list-products-view',
  standalone: true,
  imports: [
    ProductViewComponent
  ],
  templateUrl: './list-products-view.component.html',
  styleUrl: './list-products-view.component.css'
})
export class ListProductsViewComponent implements OnInit{
  productData: Product;
  products: Product[];
  constructor(private productService:ProductsService) {
    this.productData={} as Product;
    this.products = [];
  }

  private getAllProducts(){
    this.productService.getAll().subscribe((response:any)=>{
      this.products=response;
    })
  };

  ngOnInit(): void {
    this.getAllProducts();
  }
}
