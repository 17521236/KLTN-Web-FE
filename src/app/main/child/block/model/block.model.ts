export class CreateBlockReq {
    name: string;
    description: string
    constructor(obj) {
        Object.assign(this, obj)
    }
}
export class UpdateBlockReq {
    name: string;
    description: string
    constructor(obj) {
        this.name = obj.name;
        this.description = obj.description;
    }
}
