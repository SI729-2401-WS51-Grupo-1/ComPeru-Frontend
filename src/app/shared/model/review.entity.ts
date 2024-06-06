export class Review {
  id:number;
  idUser:number;
  idProduct:number;
  rating:number;
  content:string;
  constructor() {
    this.id=0;
    this.idUser=0;
    this.idProduct=0;
    this.rating=0;
    this.content='';
  }

}
