import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../../../shared/model/review.entity";
import {ReviewsService} from "../../../admin-products/services/reviews.service";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {User} from "../../../shared/model/user.entity";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../../admin-products/services/users.service";
@Component({
  selector: 'app-list-reviews',
  standalone: true,
  imports: [MatListModule, MatDividerModule],
  templateUrl: './list-reviews.component.html',
  styleUrl: './list-reviews.component.css'
})
export class ListReviewsComponent implements  OnInit{
  @Input() userData: User = {} as User; // Inicialización
  productId: string | null = null;
  reviewData: Review;
  reviews: Review[];

  review:any;
  listReviews: any;
  reviewDetails:any[];

  constructor(private _route:ActivatedRoute, private reviewsService:ReviewsService, private usersService:UsersService) {
    this.reviewData = {} as Review;
    this.reviews = [];
    this.reviewDetails = [];
  }

  private getReviews(id:string) {
    this.reviewsService.getAll().subscribe((reviewsResponse: any) => {
      this.usersService.getAll().subscribe((usersResponse: any) => {

        console.log(usersResponse);
        console.log(reviewsResponse);
        // Filtra las reviews por productId
        this.reviews = reviewsResponse.filter((review: Review) => review.idProduct.toString() == id);

        console.log(this.reviews);

        // Combina reviews y usuarios
        this.reviewDetails = this.reviews.map(review => {
          const user = usersResponse.find((user: any) => user.id == review.idUser);
          return {
            id: review.id,
            userName: user ? `${user.name} ${user.lastName}` : 'Unknown User',
            rating: review.rating,
            content: review.content
          };
        });

        console.log("datos", this.reviewDetails);
      });
    });
  };

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.productId = params['Id'];
      if (this.productId) {
        this.getReviews(this.productId);
      }
    });
  }

}
