import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../../shared/services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-register-store',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    MatIcon
  ],
  templateUrl: './register-store.component.html',
  styleUrl: './register-store.component.css'
})
export class RegisterStoreComponent {

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
