import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Review} from "../../../shared/model/review.entity";
import {ReviewsService} from "../../services/reviews.service";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator,MatPaginatorModule } from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CurrencyPipe, NgClass} from "@angular/common";
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-review-table',
  standalone: true,
  imports: [MatButton, MatInputModule,
    MatCardModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
    MatIconModule, MatTableModule, NgClass, CurrencyPipe],
  templateUrl: './review-table.component.html',
  styleUrl: './review-table.component.css'
})
export class ReviewTableComponent implements OnInit{
  @Input() productId!: number;
  @Output() averageRatingEmitter: EventEmitter<number> = new EventEmitter<number>();
  review:Review;
  reviews:Review[];
  reviewDetails:any[];
  averageRating: number = 0;
  dataSource!:MatTableDataSource<any>;
  displayedColumns: string[] = ['id','user','rating','content' ]
  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;
  constructor(private reviewService: ReviewsService, private userService: UsersService) {
    this.review={} as Review;
    this.reviews=[];
    this.reviewDetails = [];
    this.dataSource = new MatTableDataSource<any>();
  }

  private getAllReviews() {
    this.reviewService.getAll().subscribe((reviewsResponse: any) => {
      this.userService.getAll().subscribe((usersResponse: any) => {

        console.log(usersResponse);
        console.log(reviewsResponse);
        // Filtra las reviews por productId
        this.reviews = reviewsResponse.filter((review: Review) => review.idProduct == this.productId);

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
        if (this.reviews.length > 0) {
          const totalRating = this.reviews.reduce((acc, curr) => acc + curr.rating, 0);
          this.averageRating = totalRating / this.reviews.length;

          // Emitir el promedio de rating al componente padre
          this.averageRatingEmitter.emit(this.averageRating);
        }

        // Asigna los datos combinados a la tabla
        this.dataSource.data = this.reviewDetails;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  };

  ngOnInit() {
    console.log("soy el id",this.productId);
    this.getAllReviews()
  }
}
