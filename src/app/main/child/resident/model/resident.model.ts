export class ResidentReq {
    blockId: string;
    aptId: string;
    name: string;
    identityCard: string;
    type: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: number;
    note: string;
    constructor(obj) {
        this.aptId = obj.aptId;
        this.blockId = obj.blockId;
        this.name = obj.name;
        this.identityCard = obj.identityCard;
        this.type = obj.type;
        this.note = obj.note;
        this.phoneNumber = obj.phoneNumber;
        this.email = obj.email;
        this.dateOfBirth = typeof (obj.dateOfBirth) == 'object' ? obj.dateOfBirth.getTime() : Number(obj.dateOfBirth);
    }
}

export class SingleResidentRes extends ResidentReq {
    accountId:string;
    totalVehicle: number;
    constructor(obj) {
        super(obj);
        this.totalVehicle = obj.totalVehicle;
        this.accountId = obj.accountId;
    }
}

export class ResidentRes {
    _id: string;
    blockName: string;
    aptName: string;
    type: string;
    name: string;
    dateOfBirth: number;
    phoneNumber: string;
    email: string;
    constructor(obj) {
        this._id = obj._id;
        this.blockName = obj.blockName;
        this.aptName = obj.aptName;
        this.type = obj.type;
        this.name = obj.name;
        this.dateOfBirth = obj.dateOfBirth;
        this.email = obj.email;
        this.phoneNumber = obj.phoneNumber;
    }
}