import { ElementRef } from "@angular/core";
import { Subject } from "rxjs";

export class FormValidator {
    constructor(private submitBtnEl: ElementRef) {
    }
    private obs = new Subject();
    private obj: any = {};
    

    setValue(name, value) {
        console.log("set value")
        this.obj[name] = value;
        let keys = Object.keys(this.obj);
        let found = true;
        keys.forEach(k=>{
            if(this.obj[k] == false){
                let a = this.submitBtnEl.nativeElement;
            }
        })

    }
}