import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Input, ViewChild} from '@angular/core';
import {Product} from "../../../shared/model/product.entity";
import {MatFormField, MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, NgForm} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {StorageService} from "../../services/storage.service";
import {ReviewTableComponent} from "../review-table/review-table.component";
import {CategoryService} from "../../../public/pages/home-page/services/category.service";
import {BrandService} from "../../../shared/services/brand.service";

@Component({
  selector: 'app-create-and-edit-product',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatCardModule, MatFormField, MatButtonModule, FormsModule, NgIf, ReviewTableComponent, NgForOf],
  templateUrl: './create-and-edit-product.component.html',
  styleUrl: './create-and-edit-product.component.css'
})
export class CreateAndEditProductComponent implements OnInit {
@Input() product: any;
@Input() editMode=false;
@Input() visible = false;
@Output() productAdded = new EventEmitter<Product>();
@Output() productUpdated = new EventEmitter<Product>();
@Output() editCanceled = new EventEmitter();
@ViewChild('productForm', {static: false}) productForm!: NgForm;
imageSrc: string | ArrayBuffer | null = null;
  viewReview:boolean;

  brands:any[];
  categories:any[];

constructor(private storageService:StorageService, private categoryService:CategoryService,private brandService:BrandService) {
  this.product = {};
  this.viewReview=false;
  this.brands = [];
  this.categories = [];
}

  private resetEditState() {
    this.product = new Product();
    this.editMode = false;
    this.visible=false;
    this.imageSrc = null;
    this.productForm.resetForm();
  }

  onSubmit() {
  console.log("antes de enviar el form");
    if (this.productForm.form.valid) {
      console.log("soy el formulario y me envie");
      //colocar url
      this.product.rating=0;
      this.product.brand = this.brands.find(brand=> brand.name == this.product.brand);
      this.product.category = this.categories.find(category=>category.name==this.product.category);
      this.storageService.uploadImage('products',this.product.name+"_"+this.product.id,this.imageSrc).then(urlImage=>{
        console.log("Url de la imagen : ",urlImage);
        this.product.imageUrls[0] = urlImage || 'https://firebasestorage.googleapis.com/v0/b/comperu-resources.appspot.com/o/products%2Fundefined.png?alt=media&token=c627d455-7a5f-4f50-9279-28732f1f75ac';
        let emitter = this.editMode ? this.productUpdated : this.productAdded;
        emitter.emit(this.product);
        console.log("Este es el product",this.product)
        this.resetEditState();
      });


    }
  }
  onCancel() {
    this.editCanceled.emit();
    this.resetEditState();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
        // Assign the image URL to the product
        // this.product.imageUrl = this.imageSrc as string;
      };
      reader.readAsDataURL(file);
    }
  }
  onClickAddFiles(id:string ) {
    const fileInput = document.getElementById(id);
    if (fileInput) {
      fileInput.click();
    }
  }

  onAverageRatingChange(averageRating: number) {
    // Actualizar el rating del producto
    this.product.rating = averageRating;
  }

  getAllCategories(){
  this.categoryService.getAll().subscribe((response:any)=>{
    console.log(response);
    this.categories = response;
  })
  }

  getAllBrands(){
  this.brandService.getAll().subscribe((response:any)=>{
    this.brands = response;
  })
  }


  ngOnInit() {
    // Cargar la imagen previa del producto si ya tiene una asignada
    if (this.product.imageUrls) {
      this.imageSrc = this.product.imageUrls[0];
    }
    this.getAllBrands();
    this.getAllCategories();


  }


  // protected readonly document = document;
}
