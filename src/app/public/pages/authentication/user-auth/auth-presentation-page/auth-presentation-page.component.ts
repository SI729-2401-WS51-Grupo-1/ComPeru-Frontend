import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-auth-presentation-page',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    MatCard,
    MatIcon
  ],
  templateUrl: './auth-presentation-page.component.html',
  styleUrl: './auth-presentation-page.component.css'
})
export class AuthPresentationPageComponent {

}
