export class Bus {
    constructor(id, bus_name, bus_origin, bus_destination, coord1, coord2, coord3, coord4) {
        this.id = id;
        this.bus_name = bus_name;
        this.bus_origin = bus_origin;
        this.bus_destination = bus_destination;
        this.coord1 = coord1;
        this.coord2 = coord2;
        this.coord3 = coord3;
        this.coord4 = coord4;
    }

    static toDisplayableBus(bus){
        return {
            id: bus.id,
            bus_name: bus.bus_name,
            bus_origin: bus.bus_origin,
            bus_destination: bus.bus_destination,
            coord1: bus.coord1,
            coord2: bus.coord2,
            coord3: bus.coord3,
            coord4: bus.coord4
        }
    }
}