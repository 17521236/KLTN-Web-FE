import { Component, forwardRef, Input, OnInit} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextareaComponent),
    multi: true
  }]
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
  @Input() disabled: boolean;
  @Input() placeholder: string = "";
  @Input() label;
  value;

  constructor() { }
  private onChange = (_:any)=>{};
  private onTouched = (_:any)=>{};
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  }
  ngOnInit(): void {
  }

  changeValue(e){
    this.onChange(e);
  }
  touched(){
    this.onTouched(true)
  }

}
