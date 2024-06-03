export class Product {
  id: number;
  name: string;
  description: string;
  category: string;
  brand: string;
  modelNumber: string;
  manufacturer: string;
  price: number;
  imageUrl: string;
  availability: boolean;
  rating: number;
  stock:0;
  idEntrepreneur: number;
  // reviews: Review[];

  constructor() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.category = "";
    this.brand = "";
    this.modelNumber = "";
    this.manufacturer = "";
    this.price = 0;
    this.imageUrl = "";
    this.availability = false;
    this.rating = 0;
    this.stock=0;
    this.idEntrepreneur=0;
    // this.reviews = [];
  }



}

// interface Review {
//   id: number;
//   userId: number;
//   userName: string;
//   rating: number;
//   comment: string;
//   date: Date;
// }
