export class Shipment {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  number: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  documentNumber: string;
  userId:number;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    street: string,
    number: string,
    city: string,
    postalCode: string,
    country: string,
    phoneNumber: string,
    documentNumber: string,
    userId:number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.street = street;
    this.number = number;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
    this.phoneNumber = phoneNumber;
    this.documentNumber = documentNumber;
    this.userId = userId;
  }
}
