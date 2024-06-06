import { Component, inject } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

import {MatIconModule} from '@angular/material/icon';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {AuthService} from "../../../../../shared/services/auth.service";
import {DialogElementsComponent} from "../../user-auth/dialog-elements/dialog-elements.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatLabel, MatFormField, MatButton, RouterLink, MatInput, MatIconModule,
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,
    DialogElementsComponent],
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  //dl = inject(DialogElementsComponent);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    //console.log('register');
    const rawForm = this.form.getRawValue()
    this.authService
    .register(rawForm.email, rawForm.username, rawForm.password)
    .subscribe({
      next: () =>{
      this.router.navigateByUrl('/');
    },
    error: (err) => {
      this.errorMessage = err.code;alert('Credenciales no validas \n' + err.code);
     // this.dl.openDialog(err.code);
    }
  });
  }


}
