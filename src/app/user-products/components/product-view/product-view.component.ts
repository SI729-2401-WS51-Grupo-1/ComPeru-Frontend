import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {Product} from "../../../shared/model/product.entity";

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent {
  @Input() product: Product;
  constructor() {
    this.product={} as Product;
  }
}
