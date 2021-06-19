import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ToastrService } from 'ngx-toastr';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { PATTERN } from 'src/app/core/pattern';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  @Output() success = new EventEmitter<any>();

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    public modal: NzModalService,
    private toast: ToastrService
  ) { }
  ERROR_MSG = ERROR_MSG;
  form: FormGroup;
  pending = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", Validators.pattern(PATTERN.EMAIL)],
      password: ["", Validators.required],
      name: ["", Validators.required],
      identityCard: ["", Validators.pattern(PATTERN.ONLY_NUMBER)],
      phoneNumber: ["", Validators.pattern(PATTERN.ONLY_NUMBER)],
      addr: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      role: "0"
    })
  }
  add() {
    if (this.form.valid) {
      this.pending = true;
      let data = { ...this.form.value, dateOfBirth: new Date(this.form.value.dateOfBirth).getTime() }
      this.employeeService.add(data).subscribe(_ => {
        this.toast.success(SUCCESS_MSG.add);
        this.pending = false;
        this.success.emit();
        this.modal.closeAll();
      }, err => {
        this.pending = false;
        if (err.error.error.keyValue.email) {
          this.toast.error(`Email ${err.error.error.keyValue.email} đã tồn tại`);
        }
      })
    }
  }

}
