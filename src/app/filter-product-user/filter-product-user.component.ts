import { Component } from '@angular/core';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatRadioButton, MatRadioGroup, MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";

@Component({
  selector: 'app-filter-product-user',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule, MatButtonModule, MatRadioModule, FormsModule,
    MatCheckboxModule,MatFormFieldModule,MatInputModule,MatSliderModule],
  templateUrl: './filter-product-user.component.html',
  styleUrl: './filter-product-user.component.css'
})
export class FilterProductUserComponent {
  panelOpenState = false;
  brands: any[];
  categorySelected:string;
  categories:string[];
  selectedBrands: string[];
  constructor() {
    this.categorySelected = '';
    this.categories = [
      'Laptops',
      'Smartphones',
       'Tablets',
      'Television'
    ];
    this.brands = [
      'Apple',
      'Samsung',
      'Dell',
      'HP',
      'Lenovo'
      // Add more brands as needed
    ];
    this.selectedBrands = [];
  }
  onBrandChange(brand: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedBrands.push(brand);
    } else {
      const index = this.selectedBrands.indexOf(brand);
      if (index > -1) {
        this.selectedBrands.splice(index, 1);
      }
    }
  }


}
