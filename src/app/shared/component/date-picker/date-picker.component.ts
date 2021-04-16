import { Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
  }]
})
export class DatePickerComponent implements OnInit {
  private onChange = (_: any) => { };
  private onTouched = (_: any) => { };
  @Input() isShowClear = true;
  @Input() isDisabled = false;
  @Input() label: string;
  value;
  @Input() dateFormat = 'yyyy/MM/dd';
  @Input() disabledDate;
  @Output() onClose = new EventEmitter();

  @Input() isRequired = false;
  @ViewChild('datePicker') datePicker: any;
  today = new Date();
  canClose = false;

  constructor() { }

  ngOnInit(): void {
  }

  onChangeValue($event: Date) {
    this.onChange($event);
  }

  onOpenChange(isOpen: boolean) {
    if (!isOpen && !this.canClose) {
      this.datePicker.open();
      this.onTouched(true);
    }
    if(!isOpen && this.canClose){
      this.onClose.emit();
    }
  }

  onCalendarChange(e: Date) {
    this.onChange(e);
  }

  selectedToday() {
    this.value = this.today;
    this.onChange(new Date());
  }

  selectedOk() {
    this.canClose = true;
    this.datePicker.close();
    this.canClose = false;
  }

  open(){
    this.datePicker.open();
  }

  // 
  writeValue(value:any){
    this.value = value;
  }
  registerOnChange(fn:any){
    this.onChange = fn;
  }
  registerOnTouched(fn:any){
    this.onTouched = fn;
  }
  setDisabledState(isDisable:boolean){
  }
}
