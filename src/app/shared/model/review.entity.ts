export class Review {
  reviewId:number;
  userId:number;
  productId:number;
  rating:number;
  content:string;
  constructor() {
    this.reviewId=0;
    this.userId=0;
    this.productId=0;
    this.rating=0;
    this.content='';
  }

}
