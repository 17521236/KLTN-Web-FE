export class ApartmentReq {
    blockId: string;
    name: string;
    type: string;
    area: string;
    description: string;
    constructor(obj) {
        Object.assign(this, obj)
    }
}
