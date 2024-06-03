export class Offer {
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
  stock: number;
  idEntrepreneur: number;
  constructor() {
    this.id = 0;
    this.name = "";
    this.description="";
    this.category="";
    this.brand="";
    this.modelNumber="";
    this.manufacturer="";
    this.imageUrl = "";
    this.price = 0.0;
    this.availability=false;
    this.rating = 0;
    this.stock = 0;
    this.idEntrepreneur = 0;
  }
}
