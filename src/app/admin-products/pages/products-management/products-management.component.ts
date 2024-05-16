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

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [
    MatButton, MatInputModule,
    MatCardModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
    MatIconModule, MatTableModule, NgClass, CurrencyPipe, CreateAndEditProductComponent
  ],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.css'
})
export class ProductsManagementComponent implements OnInit, AfterViewInit  {
productData: Product;
dataSource!:MatTableDataSource<any>;
displayedColumns: string[] = ['id','name','category','price','rating','actions' ]
  isEditMode: boolean;
isVisibleCard:boolean;


  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
constructor(private productService:ProductsService) {
  this.productData={} as Product;
  this.dataSource = new MatTableDataSource<any>();
  this.isEditMode=false;
  this.isVisibleCard=false;
}
  private resetEditState(): void {
    this.isEditMode = false;
    this.isVisibleCard=false;
    this.productData = {} as Product;
  }
//CRUD ACTIOS
  private getAllProducts(){
  this.productService.getAll().subscribe((response:any)=>{
    this.dataSource.data=response;
  })
  };

  private createProduct(){
    // // Asignar un valor de rating por defecto (por ejemplo, 0)
  console.log(this.productData);
  console.log(this.dataSource);
    this.productService.create(this.productData).subscribe((response:any)=>{
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((product: Product)=>{return product;});
    })
  }

  private updateProduct() {
    let productToUpdate = this.productData;
    this.productService.update(this.productData.id, productToUpdate).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((product: Product) => {
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
