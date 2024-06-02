import {Component, HostListener} from '@angular/core';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FilterProductUserComponent} from "../../../filter-product-user/filter-product-user.component";
import {
  ListProductsViewComponent
} from "../../../user-products/components/list-products-view/list-products-view.component";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, MatFormField, MatInput, FilterProductUserComponent, ListProductsViewComponent, RouterOutlet, RouterLink
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

  visibleFilterPanel: boolean;

  constructor() {
    this.visibleFilterPanel = window.innerWidth >= 1159;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.visibleFilterPanel = window.innerWidth >= 1159;
  }
  openFilterPanel(){
    this.visibleFilterPanel = !this.visibleFilterPanel;
  }
}
