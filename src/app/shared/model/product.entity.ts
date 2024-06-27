export class Product {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  brandId: number;
  modelNumber: string;
  manufacturerNumber: string;
  price: number;
  imageUrls: string[];
  availability: boolean;
  rating: number;
  stock:number;
  userId: number;
  constructor() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.categoryId = 0;
    this.brandId = 0;
    this.modelNumber = "";
    this.manufacturerNumber = "";
    this.price = 0;
    this.imageUrls = [];
    this.availability = false;
    this.rating = 0;
    this.stock=0;
    this.userId=0;
  }

}

