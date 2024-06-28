import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCardModule} from '@angular/material/card';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator,MatPaginatorModule } from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import {ProductsService} from "../../services/products.service";
import {Product} from "../../../shared/model/product.entity";
import {CurrencyPipe, NgClass} from "@angular/common";
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  CreateAndEditProductComponent
} from "../../components/create-and-edit-product/create-and-edit-product.component";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../../../iam/services/authentication.service";

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [
    MatButton, MatInputModule,
    MatCardModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
    MatIconModule, MatTableModule, NgClass, CurrencyPipe, CreateAndEditProductComponent, MatOption, MatSelect, RouterLink
  ],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.css'
})
export class ProductsManagementComponent implements OnInit, AfterViewInit  {
productData: any;
dataSource!:MatTableDataSource<any>;
displayedColumns: string[] = ['id','name','category','price','rating','actions' ]
  isEditMode: boolean;
isVisibleCard:boolean;
  userId:number=0;
  isSignedIn: boolean = false;


  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
constructor(private productService:ProductsService, private authenticationService:AuthenticationService) {
  this.productData={} ;
  this.dataSource = new MatTableDataSource<any>();
  this.isEditMode=false;
  this.isVisibleCard=false;
  this.authenticationService.isSignedIn.subscribe(
    (isSignedIn) => this.isSignedIn = isSignedIn
  );
  if(this.isSignedIn){
    this.authenticationService.currentUserId.subscribe((userId)=>this.userId = userId);
  }
}
  private resetEditState(): void {
    this.isEditMode = false;
    this.isVisibleCard=false;
    this.productData = {} as Product;
  }
//CRUD ACTIOS
  private getAllProducts() {
    this.productService.getAllProducts().subscribe((response: any) => {
      let productsFilter = response.filter((product:any) => product.entrepreneurId === this.userId);
      this.dataSource.data = productsFilter;
    });
  }

  private createProduct(){
  console.log("Soy un rating",this.productData.rating);
  console.log(this.dataSource);
  let urlImages = [];
  urlImages.push(this.productData.imageUrls);
    let productToCreate: Product = {
      id: 0,
      name: this.productData.name,
      description: this.productData.description,
      categoryId: this.productData.category.Id,
      brandId: this.productData.brand.Id,
      modelNumber: this.productData.modelNumber,
      manufacturerNumber: this.productData.manufacturerNumber,
      price: this.productData.price,
      imageUrls: urlImages || [],
      availability: this.productData.availability,
      rating: 0,
      stock: this.productData.stock,
      userId: this.productData.userId
    };
    console.log(productToCreate);
    this.productService.create(productToCreate).subscribe((response: any) => {
      this.dataSource.data = [...this.dataSource.data, response];
    });
  }

  private updateProduct() {
    let urlImages = [];
    urlImages.push(this.productData.imageUrls);
    let productToUpdate: Product = {
      id: 0,
      name: this.productData.name,
      description: this.productData.description,
      categoryId: this.productData.category.Id,
      brandId: this.productData.brand.Id,
      modelNumber: this.productData.modelNumber,
      manufacturerNumber: this.productData.manufacturerNumber,
      price: this.productData.price,
      imageUrls: urlImages || [],
      availability: this.productData.availability,
      rating: 0,
      stock: this.productData.stock,
      userId: this.productData.userId
    };
    this.productService.update(this.productData.id, productToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((product: any) => {
        if (product.id === response.id) {
          return response;
        }
        return product;
      });
    });
  }

  private deleteProduct(productId: number) {
    this.productService.delete(productId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((product: Product) => {
        return product.id !== productId ? product : false;
      });
    });
  };



  onEditItem(element: Product) {
    this.isEditMode = true;
    this.productData = element;
  }

  //UI Events

  addProduct(){
    this.isVisibleCard=true;
    this.isEditMode=false;
  }
  onDeleteItem(element: Product) {
    this.deleteProduct(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllProducts();
  }

  onProductAdded(element: Product) {
    this.productData = element;
    console.log("Soy el producto recibido",typeof  this.productData, this.productData);
    this.createProduct();
    this.resetEditState();
  }

  onProductUpdated(element: Product) {
    this.productData = element;
    this.updateProduct();
    this.resetEditState();
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
