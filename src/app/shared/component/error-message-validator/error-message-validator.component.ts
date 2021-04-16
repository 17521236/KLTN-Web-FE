import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
export class ValidationModel{
  required?: string;
  partten?: string;
  min? : string;
  max? :string;
}
@Component({
  selector: 'app-error-message-validator',
  templateUrl: './error-message-validator.component.html',
  styleUrls: ['./error-message-validator.component.scss']
})
export class ErrorMessageValidatorComponent implements OnInit {
  @Input() formGroup : FormGroup;
  @Input() controlName : string;
  @Input() validationMessages:  ValidationModel;
  constructor() { }

  ngOnInit(): void {
  }
  getKeys(obj){
    if(obj){
      return Object.keys(obj);
    }
    return [];
  }
}
