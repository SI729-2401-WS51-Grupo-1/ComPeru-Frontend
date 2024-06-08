import { Component } from '@angular/core';

// Material imports
import {EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatFormFieldControl} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";

// Own imports
import { Order } from "../../../shared/model/order.entity";

@Component({
  selector: 'app-order-create-and-edit',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './order-create-and-edit.component.html',
  styleUrl: './order-create-and-edit.component.css'
})

export class OrderCreateAndEditComponent {

  // Attributes
  @Input() order: Order;
  @Input() editMode = false;
  @Output() orderAdded = new EventEmitter<Order>();
  @Output() orderUpdated = new EventEmitter<Order>();
  @Output() editCanceled = new EventEmitter();

  // Edit form
  @ViewChild('orderForm', {static: false}) orderForm!: NgForm;

  // Methods
  constructor() {
    this.order = {} as Order;
  }

  // Private methods
  private resetEditState() {
    this.order = {} as Order;
    this.editMode = false;
    this.orderForm.resetForm();
  }

  // Event Handlers
  onSubmit() {
    if (this.orderForm.form.valid) {
      let emitter = this.editMode ? this.orderUpdated : this.orderAdded;
      emitter.emit(this.order);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel() {
    this.editCanceled.emit();
    this.resetEditState();
  }

}
