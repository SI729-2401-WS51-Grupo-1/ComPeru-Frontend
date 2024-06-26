export class Trip{
    constructor(id,idUser,type,origin,destination,startDate,endDate,price){
        this.id = id;
        this.idUser = idUser;
        this.type = type;
        this.origin = origin;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
    }
    static fromDisplayableTrip(displayableTrip) {
        return new Trip(
            displayableTrip.id,
            displayableTrip.idUser,
            displayableTrip.type,
            displayableTrip.origin,
            displayableTrip.destination,
            displayableTrip.startDate,
            displayableTrip.endDate,
            displayableTrip.price);
    }
    static toDisplayableTrip(trip) {
        return {
            id: trip.id,
            idUser: trip.idUser,
            type: trip.type,
            origin: trip.origin,
            destination: trip.destination,
            startDate: trip.startDate,
            endDate: trip.endDate,
            price: trip.price
        };
    }
}