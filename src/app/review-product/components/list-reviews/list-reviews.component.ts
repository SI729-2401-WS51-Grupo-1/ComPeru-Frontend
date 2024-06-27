import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../../shared/model/review.entity";
import {ReviewsService} from "../../../admin-products/services/reviews.service";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {User} from "../../../shared/model/user.entity";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../../admin-products/services/users.service";
import {MatIcon} from "@angular/material/icon";
import {NgClass, NgForOf} from "@angular/common";
@Component({
  selector: 'app-list-reviews',
  standalone: true,
  imports: [MatListModule, MatDividerModule, MatIcon, NgForOf, NgClass],
  templateUrl: './list-reviews.component.html',
  styleUrl: './list-reviews.component.css'
})
export class ListReviewsComponent implements  OnInit{
  @Input() userData:any={}; // Inicialización
  productId: string | null = null;
  reviewData: any;
  reviews: any[];
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  review:any;
  listReviews: any;
  reviewDetails:any[];

  constructor(private _route:ActivatedRoute, private reviewsService:ReviewsService, private usersService:UsersService) {
    this.reviewData = {} ;
    this.reviews = [];
    this.reviewDetails = [];
  }

  private getReviews(id:string) {
    this.reviewsService.getAll().subscribe((reviewsResponse: any) => {
      this.usersService.getAll().subscribe((usersResponse: any) => {

        console.log(usersResponse);
        console.log(reviewsResponse);
        // Filtra las reviews por productId
        this.reviews = reviewsResponse.filter((review: any) => review.productId.toString() == id);

        console.log(this.reviews);

        // Combina reviews y usuarios
        this.reviewDetails = this.reviews.map(review => {
          const user = usersResponse.find((user: any) => user.id == review.userId);
          return {
            id: review.reviewId,
            userName: user ? `${user.username}` : 'Unknown User',
            rating: review.rating,
            content: review.content
          };
        });

        console.log("datos", this.reviewDetails);
      });
    });
  };
  rate(star: number) {
    this.rating = star;
  }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.getReviews(this.productId);
      }
    });
  }

}
