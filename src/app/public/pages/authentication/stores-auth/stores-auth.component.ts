import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import { MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-stores-auth',
  templateUrl: './stores-auth.component.html',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatCardModule
  ],
  styleUrls: ['./stores-auth.component.css']
})
export class StoresAuthComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    ruc: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // You can put other initialization logic here
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Here you can handle the registration logic, like sending the data to a server
    } else {
      console.log('Form is not valid');
    }
  }
}
