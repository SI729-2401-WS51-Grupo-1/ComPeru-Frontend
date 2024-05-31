import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Input, ViewChild} from '@angular/core';
import {Product} from "../../../shared/model/product.entity";
import {MatFormField, MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {StorageService} from "../../services/storage.service";
import {ReviewTableComponent} from "../review-table/review-table.component";

@Component({
  selector: 'app-create-and-edit-product',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatCardModule, MatFormField, MatButtonModule, FormsModule, NgIf, ReviewTableComponent],
  templateUrl: './create-and-edit-product.component.html',
  styleUrl: './create-and-edit-product.component.css'
})
export class CreateAndEditProductComponent implements OnInit {
@Input() product: Product;
@Input() editMode=false;
@Input() visible = false;
@Output() productAdded = new EventEmitter<Product>();
@Output() productUpdated = new EventEmitter<Product>();
@Output() editCanceled = new EventEmitter();
@ViewChild('productForm', {static: false}) productForm!: NgForm;
imageSrc: string | ArrayBuffer | null = null;
  viewReview:boolean;
constructor(private storageService:StorageService) {
  this.product = new Product();
  this.viewReview=false;
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
      this.storageService.uploadImage('products',this.product.name+"_"+this.product.id,this.imageSrc).then(urlImage=>{
        console.log("Url de la imagen : ",urlImage);
        this.product.imageUrl = urlImage || 'https://firebasestorage.googleapis.com/v0/b/comperu-resources.appspot.com/o/products%2Fundefined.png?alt=media&token=c627d455-7a5f-4f50-9279-28732f1f75ac';
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

  ngOnInit() {
    // Cargar la imagen previa del producto si ya tiene una asignada
    if (this.product.imageUrl) {
      this.imageSrc = this.product.imageUrl;
    }
  }


  // protected readonly document = document;
}
