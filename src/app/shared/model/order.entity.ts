export class Order {
  id: number;
  userId: number;
  productId:number;
  shippingAddress: string;
  orderDate: Date;
  status: string;
  total: number;

  constructor() {
    this.id = 0;
    this.userId = 0;
    this.productId = 0;
    this.shippingAddress = '';
    this.orderDate = new Date();
    this.status = '';
    this.total = 0;
  }
}
