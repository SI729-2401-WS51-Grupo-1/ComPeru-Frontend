import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatCardFooter} from "@angular/material/card";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbar,
    RouterLink,
    MatCardFooter
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
