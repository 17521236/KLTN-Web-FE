import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownItem } from './model/dropdown.model';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  }]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = "";
  @Input() options: Array<DropdownItem> = [];
  @Input() disabled: boolean;
  @Input() clearable: boolean;
  value;
  @Input() label: string;
  mode: string = "default";
  @Input() showSearch: boolean = false;
  error: boolean;
  @Input() isRequired = false;

  private onChange = (_: any) => { };
  private onTouched = (_: any) => { };
  writeValue(value: any) {
    this.value = value;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  constructor() { }

  ngOnInit(): void {
  }
  onValueChange(data) {
    this.onChange(data);
  }
  onBlur() {
    this.onTouched(true);
  }
}
