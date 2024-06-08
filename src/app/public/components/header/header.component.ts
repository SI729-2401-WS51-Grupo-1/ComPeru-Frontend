import { Component } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,MatButtonModule,MatIconModule, MatFormField, MatInputModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
