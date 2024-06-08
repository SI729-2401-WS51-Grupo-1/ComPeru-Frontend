import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-store-choose',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    RouterLink,
    MatIcon
  ],
  templateUrl: './store-choose.component.html',
  styleUrl: './store-choose.component.css'
})
export class StoreChooseComponent {

}
