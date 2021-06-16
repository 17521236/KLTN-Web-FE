export class Service {
    name: string;
    cost: string;
    unit: string;
    desc: string;
    constructor(obj){
        this.name = obj.name;
        this.cost = obj.cost;
        this.unit = obj.unit;
        this.desc = obj.desc;
    }
}