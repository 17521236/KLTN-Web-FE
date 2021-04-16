export class ApartmentReq {
    blockId: string;
    name: string;
    type: string;
    area: string;
    description: string;
    constructor(obj) {
        this.blockId = obj.blockId,
            this.name = obj.name,
            this.type = obj.type,
            this.area = obj.area,
            this.description = obj.description
    }
}
