interface Rating {
  rate: number;
  count: number;
}

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
  qty: number;
  subTotal: number;
  idEntrepreneur: string;
  stripePriceId: string; // ID de precio de Stripe


  rating: Rating;

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
    this.rating = { rate: 0, count: 0 }; // Inicialización correcta de Rating
    this.qty=0;
    this.subTotal = 0;
    this.idEntrepreneur="";
    this.stripePriceId = "";
  }
  // reviews: Review[];
}

// interface Review {
//   id: number;
//   userId: number;
//   userName: string;
//   rating: number;
//   comment: string;
//   date: Date;
// }
