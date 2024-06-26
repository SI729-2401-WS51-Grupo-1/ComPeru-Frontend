import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatRadioButton, MatRadioGroup, MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {CategoryService} from "../public/pages/home-page/services/category.service";
import {BrandService} from "../shared/services/brand.service";
import {Brand} from "../shared/model/brand.entity";
import {Category} from "../shared/model/category.entity";
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-product-user',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule, MatButtonModule, MatRadioModule, FormsModule,
    MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSliderModule, ReactiveFormsModule],
  templateUrl: './filter-product-user.component.html',
  styleUrl: './filter-product-user.component.css'
})
export class FilterProductUserComponent implements OnInit{
  panelOpenState = false;
  brands: Brand[];
  categorySelected:Category;
  categories:Category[];
  selectedBrands: string[];
  minPriceControl: FormControl;
  maxPriceControl: FormControl;
  minRating:number;
  maxRating:number;

  @Output() applyCategoryFilter = new EventEmitter<string>();
  @Output() applyBrandFilter = new EventEmitter<string[]>();
  @Output() applyPriceRangeFilter = new EventEmitter<{ min: number, max: number }>();
  @Output() applyRatingRangeFilter = new EventEmitter<{ min: number, max: number }>();
  constructor(private categoryService:CategoryService,private brandService:BrandService) {
    this.categorySelected = {} as Category;
    this.brands=[];
    this.categories=[];
    this.selectedBrands = [];
    this.minPriceControl = new FormControl(0, [Validators.min(0)]);
    this.maxPriceControl = new FormControl(0, [Validators.min(0)]);
    this.minRating = 0;
    this.maxRating = 1;

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
    this.applyBrandFilter.emit(this.selectedBrands);
  }
  onCategorySelected(){
    const nameCategory = this.categorySelected.name;
    this.applyCategoryFilter.emit(nameCategory);
  }
  filterForBrand(){
    this.applyBrandFilter.emit(this.selectedBrands);
  }
  private getAllCategories(){
    this.categoryService.getAll().subscribe((response:any)=>{
      this.categories = response;
    })
  }
  applyPriceFilter() {
    const minPrice = this.minPriceControl.value ?? 0;
    const maxPrice = this.maxPriceControl.value ?? 0;

    if (minPrice < 0) {
      this.minPriceControl.setValue(0);
    }

    if (maxPrice < 0) {
      this.maxPriceControl.setValue(0);
    }

    if (minPrice <= maxPrice) {
      this.applyPriceRangeFilter.emit({ min: minPrice, max: maxPrice });
    } else {
      console.error('Minimum price cannot be greater than maximum price');
    }
  }

  onRatingFilter(){
    this.applyRatingRangeFilter.emit({ min: this.minRating, max: this.maxRating })
  }
  private getAllBrands(){
      this.brandService.getAll().subscribe((response:any)=>{
        this.brands = response;
        this.brands.push({ id: 0, name: 'Others' });
      })
  }
  ngOnInit() {
    this.getAllCategories();
    this.getAllBrands();
  }

}
