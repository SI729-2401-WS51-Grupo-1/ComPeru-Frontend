import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterLink,
    MatIconButton,
    MatIcon,
    MatInput,
    MatToolbar,
    RouterOutlet
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
