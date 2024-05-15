import {Component, EventEmitter, Output} from '@angular/core';
import { Input, ViewChild} from '@angular/core';
import {Product} from "../../../shared/model/product.entity";
import {MatFormField, MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-create-and-edit-product',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatCardModule,MatFormField,MatButtonModule,FormsModule,NgIf],
  templateUrl: './create-and-edit-product.component.html',
  styleUrl: './create-and-edit-product.component.css'
})
export class CreateAndEditProductComponent {
@Input() product: Product;
@Input() editMode=false;
@Input() visible = false;
@Output() productAdded = new EventEmitter<Product>();
@Output() productUpdated = new EventEmitter<Product>();
@Output() editCanceled = new EventEmitter();
@ViewChild('productForm', {static: false}) productForm!: NgForm;

constructor() {
  this.product = {} as Product;
}

  private resetEditState() {
    this.product = {} as Product;
    this.editMode = false;
    this.visible=false;
    this.productForm.resetForm();
  }
  onSubmit() {
  console.log("antes de enviar el form");
    if (this.productForm.form.valid) {
      console.log("soy el formulario y me envie")
      let emitter = this.editMode ? this.productUpdated : this.productAdded;
      emitter.emit(this.product);
      console.log("Este es el product",this.product)
      this.resetEditState();
    }
  }
  onCancel() {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
