export class VehicleReq {
    residentId: string;
    licensePlate: string;
    price: number;
    status: string;
    type: string;
    constructor(obj) {
        this.residentId = obj.residentId;
        this.licensePlate = obj.licensePlate;
        this.price = obj.price;
        this.status = obj.status;
        this.type = obj.type;
    }
}

export class VehicleRes {
    
}