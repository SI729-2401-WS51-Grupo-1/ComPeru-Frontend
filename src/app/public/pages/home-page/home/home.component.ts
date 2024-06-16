import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {Category} from "../../../../shared/model/category.entity";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";

export enum CategoryPhrases {
  Laptops = 'Explore our wide range of Laptops',
  Smartphones = 'Discover the latest Smartphones',
  Tablets = 'Find your perfect Tablet',
  Televisions = 'Enjoy the best TV experience',
  Smartwatches = 'Upgrade your style with Smartwatches',
  Cameras = 'Capture moments with our Cameras',
  Accessories = 'Enhance your devices with Accessories',
  GamingConsoles = 'Get the best Gaming gear',
  Headphones = 'Experience top-notch Audio',
  Monitors = 'Get the best view with our Monitors'
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{


  categories:Category[];

  constructor(private categoryService:CategoryService,private router: Router) {
    this.categories = [];
  }

  private getAllCategories(){
    this.categoryService.getAll().subscribe((response:any)=>{
      this.categories = response;
    })
  }
  getCategoryPhrase(categoryName: string): string {
    return CategoryPhrases[categoryName as keyof typeof CategoryPhrases];
  }

  viewCategory(categoryName: string){
    this.router.navigate(['/users/product-page',categoryName]);
  }
  ngOnInit() {
    this.getAllCategories();
  }
}
