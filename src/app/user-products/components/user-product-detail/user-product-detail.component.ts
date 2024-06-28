import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {MatButton, MatButtonModule, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProductsService} from "../../../admin-products/services/products.service";
import {Product} from "../../../shared/model/product.entity";
import {CurrencyPipe, NgClass, NgForOf, NgStyle} from "@angular/common";
import {UsersService} from "../../../admin-products/services/users.service";
import {User} from "../../../shared/model/user.entity";
import {ListReviewsComponent} from "../../../review-product/components/list-reviews/list-reviews.component";
import {WishlistService} from "../../../public/pages/user-page/wishlist/services/wishlist.service";
import {CartService} from "../../../public/pages/user-page/cart/services/cart.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ComparatorComponent} from "../../../price-comparator/components/comparator/comparator.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {Review} from "../../../shared/model/review.entity";
import {ReviewsService} from "../../../admin-products/services/reviews.service";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {RatingDialogComponent} from "../rating-dialog/rating-dialog.component";
import {AuthenticationService} from "../../../iam/services/authentication.service";

@Component({
  selector: 'app-user-product-detail',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    RouterLink,
    MatFabButton,
    CurrencyPipe,
    NgStyle,
    MatButton,
    ListReviewsComponent,
    ReactiveFormsModule,
    FormsModule,
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,
    ComparatorComponent,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatSliderModule, NgClass, NgForOf, MatDialogContent, MatDialogTitle, MatDialogActions, MatDialogClose
  ],
  templateUrl: './user-product-detail.component.html',
  styleUrl: './user-product-detail.component.css'
})
export class UserProductDetailComponent implements OnInit{
  isFavorite: boolean = false;
  addedToCart:boolean = false;
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  productData: any;
  products: any[];
  review:Review;
  productId: string | null = null;
  userData: any;
  selectedQuantity: number = 1; // Nueva propiedad para almacenar la cantidad seleccionada
  readonly dialog = inject(MatDialog);
  userId:number=0;
  isSignedIn: boolean = false;
  reviews: any[];
  reviewDetails:any[];
  reviewData: any;

  openDialog(title: string, content: string, showCloseButton: boolean): void {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      data: { title, content, showCloseButton }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
    });
  }

  // Define the initial and favorite colors
  initialColor: string = '#CACECE';
  favoriteColor: string = '#FF8082';
  constructor(private authenticationService:AuthenticationService,private _route:ActivatedRoute,private productService:ProductsService, private userService:UsersService,
              private wishlistService: WishlistService,
              private cartService: CartService, private reviewService:ReviewsService,   private router: Router


  ) {
    this.reviewData = {} ;
    this.reviews = [];
    this.reviewDetails = [];
    this.productData={} ;
    this.products = [];
    this.userData = {} ;
    this.review = new Review();
    this.authenticationService.isSignedIn.subscribe(
      (isSignedIn) => this.isSignedIn = isSignedIn
    );
    if(this.isSignedIn){
      this.authenticationService.currentUserId.subscribe((userId)=>this.userId = userId);
    }
  }



  private getProduct(id:string){
    this.productService.getProductById(id).subscribe((response:any)=>{
      this.productData=response;
      this.getSeller(this.productData.entrepreneurId.toString());
    })
  }

  private getSeller(id:string){
    this.userService.getById(id).subscribe((response:any)=>{
      this.userData=response;
    })
  }


  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  addToWishlist() {
    this.isFavorite=!this.isFavorite;
    if(this.isFavorite){
      this.wishlistService.addToWishlist(this.productData);
    }
    else{
      this.wishlistService.removeFromWishlist(this.productData); // Lo implemente para eliminar y agregar desde este componente
    }
  }

  addToCart() {
    this.addedToCart = !this.addedToCart;
    this.cartService.addToCart(this.productData, this.selectedQuantity); // Envía la cantidad seleccionada al carrito
  }

  removeToCart(){
    this.addedToCart = !this.addedToCart;
    this.cartService.removeFromCart(this.productData.id);
  }
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  rate(star: number) {
    this.rating = star;
  }

  backProducts(){
    this.router.navigateByUrl(`/users/product-page/${this.productData.category.name}`);
  }
  private getReviews(id:string) {
    this.reviewService.getAll().subscribe((reviewsResponse: any) => {
      this.userService.getAll().subscribe((usersResponse: any) => {

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

  makeReview() {
    if (this.rating > 0) {
      this.review.productId = this.productId ? parseInt(this.productId, 10) : 0;
      this.review.userId = this.userId;
      this.review.rating = this.rating;
      this.reviewService.create(this.review).subscribe(response => {
        console.log('Review created successfully', response);
        this.openDialog('Review Created', 'Your review has been submitted successfully.', true);
        this.review = new Review();
        if(this.productId)
        this.getReviews(this.productId);
      });
    } else {
      this.openDialog('Action Invalid', 'Choose a rating.', false);
    }
  }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.getProduct(this.productId);
        this.getReviews(this.productId);
      }
    });
  }


}
