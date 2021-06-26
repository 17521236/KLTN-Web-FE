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