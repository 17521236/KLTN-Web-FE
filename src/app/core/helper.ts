import { FormGroup } from '@angular/forms';
import { isEqual } from 'lodash';
export class FormHelper {
    form: FormGroup;
    preVal: any;
    isEqual = () => {
        console.log('x')
        return isEqual(this.preVal, this.form.value);
    }
    constructor(form: FormGroup) {
        this.form = form;
        this.preVal = form.value;
    }
}
export const coverFileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function () {
            const encoded = btoa(String(reader.result));
            resolve(encoded)
        };
        reader.onerror = function () {
            reject('there are some problems');
        };
    })
}