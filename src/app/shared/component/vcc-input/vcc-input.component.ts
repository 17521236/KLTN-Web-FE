import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputMask } from '../input/model/input-mask.model';

@Component({
  selector: 'app-vcc-input',
  templateUrl: './vcc-input.component.html',
  styleUrls: ['./vcc-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => VccInputComponent),
    multi: true
  }],
})

export class VccInputComponent implements OnInit, ControlValueAccessor {
  @Input() label;
  @Input() placeholder: string = "";
  value;
  @Input() type;
  @Input() autocomplete;
  @Input() name: string;
  @Input() disabled: boolean;
  // pattern
  // @Input() required: boolean;
  // @Input() pattern: string;
  // @Input() maxlength: number;
  // @Input() minlength: number;
  // template
  @Input() prefixTpl: any;
  @Input() suffixTpl: any;
  @Input() clearfix: boolean = false;
  @Input() mask: InputMask = new InputMask(false);
  @Input() class: string = '';

  private onChange = (_: any) => { };
  private onTouched = (_: any) => { };
  isVisible = false;

  constructor() { }
  ngOnInit(): void {
  }

  clear() {
    this.value = null;
    this.emitChange();
  }
  emitChange() {
    this.onChange(this.value);
  }

  // 
  writeValue(value: any) {
    this.value = value;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(isDisable: boolean) {
  }
  touched() {
    this.onTouched(true);
  }
}
