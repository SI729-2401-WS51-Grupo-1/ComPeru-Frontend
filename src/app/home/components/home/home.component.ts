import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../public/components/header/header.component";
import { FooterComponent } from "../../../public/components/footer/footer.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { NgFor } from "@angular/common";
import {Offer} from "../../../shared/model/offer.entity";
import {OfferService} from "../../services/offer.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatCardModule, MatButtonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  offers: Array<Offer> = [];

  constructor(private productsService: OfferService) {
  }

  private getAllOffers() {
    this.productsService.getAll().subscribe((response: any) => {
      this.offers=response
    });
  }

  ngOnInit(): void {
    this.getAllOffers();
  }
}

