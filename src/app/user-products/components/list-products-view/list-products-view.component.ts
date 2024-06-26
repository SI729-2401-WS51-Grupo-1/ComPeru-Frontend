import {Component, HostListener, OnInit} from '@angular/core';
import {ProductsService} from "../../../admin-products/services/products.service";
import {Product} from "../../../shared/model/product.entity";
import {ProductViewComponent} from "../product-view/product-view.component";
import {FilterProductUserComponent} from "../../../filter-product-user/filter-product-user.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-list-products-view',
  standalone: true,
  imports: [
    ProductViewComponent,
    FilterProductUserComponent,
    MatButton,
    MatIcon
  ],
  templateUrl: './list-products-view.component.html',
  styleUrl: './list-products-view.component.css'
})
export class ListProductsViewComponent implements OnInit{
  productData: Product;
  products: Product[];
  allProducts:Product[];
  productsBeforeSecondFilter:Product[];
  visibleFilterPanel: boolean;
  category: string;

  constructor(    private router: Router,
                  private route: ActivatedRoute,private productService:ProductsService) {
    this.productData={} as Product;
    this.products = [];
    this.allProducts=[];
    this.productsBeforeSecondFilter=[];
    this.visibleFilterPanel = window.innerWidth >= 1159;
    this.category = '';

  }

  private getAllProducts() {
    this.productService.getAll().subscribe((response: any) => {
      this.allProducts = response;
      this.filterProducts();
      console.log("misproducts", this.products);
    });
  }
  private filterProducts() {
    this.products = this.allProducts.filter(product => product.category == this.category);
    this.productsBeforeSecondFilter = this.products;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.visibleFilterPanel = window.innerWidth >= 1159;
  }
  openFilterPanel(){
    this.visibleFilterPanel = !this.visibleFilterPanel;
  }

  filterProductsByCategory(category:string){
    this.category = category;
    console.log("categoryyy",category,this.category);
    this.router.navigate(['/users/product-page',this.category]);

    // this.filterProducts();
  }

  filterProductsByBrand(selectedBrands: string[]){
    console.log("soy el selected barnd",selectedBrands);
    if(selectedBrands.length > 0){
      this.products = this.productsBeforeSecondFilter.filter(product => {
        return selectedBrands.includes(product.brand);
      });
      if(selectedBrands.includes('Others')){

      }
    }else{
      this.products = this.productsBeforeSecondFilter;
    }
  }


  filterProductsByPrice(object: { min: number, max: number }) {
    const {min, max} = object;
    if (min !== 0 || max !== 0) {
      this.products = this.productsBeforeSecondFilter.filter(product => product.price >= min && product.price <= max);
    } else {
      this.products = this.productsBeforeSecondFilter;
    }
  }

  filterProductsByRating(object: { min: number, max: number }){
    const {min, max} = object;
    this.products = this.productsBeforeSecondFilter.filter(product => product.rating >= min && product.rating <= max);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      console.log('Category:', this.category);
      this.getAllProducts();
    });
  }
}
