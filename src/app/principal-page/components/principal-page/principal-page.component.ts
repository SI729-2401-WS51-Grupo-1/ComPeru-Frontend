import { Component } from '@angular/core';
import {Offer} from "../../../shared/model/offer.entity";
import {OfferService} from "../../services/offer.service";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardImage
} from "@angular/material/card";
import {FooterComponent} from "../../../public/components/footer/footer.component";
import {RouterLink} from "@angular/router";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatToolbar} from "@angular/material/toolbar";
import {NgForOf} from "@angular/common";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-principal-page',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardFooter,
    FooterComponent,
    RouterLink,
    MatCardImage,
    MatGridList,
    MatToolbar,
    MatCardActions,
    MatGridTile,
    NgForOf,
    MatAnchor
  ],
  templateUrl: './principal-page.component.html',
  styleUrl: './principal-page.component.css'
})
export class PrincipalPageComponent {
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
