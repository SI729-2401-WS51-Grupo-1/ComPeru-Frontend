import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';


import { MatFormFieldModule } from '@angular/material/form-field'; // Importa el módulo de form field de Angular Material
import { MatInputModule } from '@angular/material/input'; // Importa el módulo de input de Angular Material
import { MatButtonModule } from '@angular/material/button';
import {AuthService} from "../../../../../shared/services/auth.service";
import {AppComponent} from "../../../../../app.component"; // Importa el módulo de botón de Angular Material

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AppComponent, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  onSubmit(): void {
      //console.log('login');
      const rawForm = this.form.getRawValue()
      this.authService
      .login(rawForm.email, rawForm.password)
      .subscribe({
        next: () =>{
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.errorMessage = err.code;alert('Credenciales no validas \n' + err.code);
      }
    });
    }


}
