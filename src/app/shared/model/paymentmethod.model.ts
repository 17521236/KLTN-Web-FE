export class PaymentMethodModel {
    cardId: number;
    cardType: number;
    cardNo: string | number;
    status: number;
    default: boolean;
    expDate: string;
    constructor(data?) {
        if (data) {
            Object.assign(this, data);
        }
    }
    get cardStatus() {
        if (this.default) {
            return "DEFAULT";
        }
        return "";
    }
    get logoClass() {
        //impement later
        return "nets";
    }

}