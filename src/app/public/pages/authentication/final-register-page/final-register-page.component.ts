import { Component } from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-final-register-page',
  standalone: true,
  imports: [
    MatCard,
    MatButton,
    RouterLink
  ],
  templateUrl: './final-register-page.component.html',
  styleUrl: './final-register-page.component.css'
})
export class FinalRegisterPageComponent {

}
