import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { PATTERN } from 'src/app/core/pattern';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { AuthService } from 'src/app/shared/service/auth.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  id = '';
  pending = false;
  details$ = this.route.params.pipe(
    tap((params: any) => this.id = params.id),
    switchMap((params: any) => this.employeeService.getOne(params.id)),
    tap(res => {
      this.form.patchValue(res);
    })
  )
  role$ = this.authService.role$;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private toast: ToastrService,
    private authService: AuthService
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.buildFormDetail();
  }
  form: FormGroup;
  ERROR_MSG = ERROR_MSG;
  buildFormDetail() {
    this.form = this.fb.group({
      email: ["", Validators.pattern(PATTERN.EMAIL)],
      password: ["", Validators.required],
      name: ["", Validators.required],
      identityCard: ["", Validators.pattern(PATTERN.ONLY_NUMBER)],
      phoneNumber: ["", Validators.pattern(PATTERN.ONLY_NUMBER)],
      addr: ["", Validators.required],
      dateOfBirth: ["", Validators.required]
    });
  }
  update() {
    if (this.form.valid) {
      this.pending = true;
      let data = { ...this.form.value, dateOfBirth: new Date(this.form.value.dateOfBirth).getTime() }
      this.employeeService.update(this.route.snapshot.params.id, data).subscribe(res => {
        this.form.markAsPristine();
        this.toast.success(SUCCESS_MSG.edit);
        this.pending = false;
      }, _ => this.pending = false)
    }
  }
  close() {
    window.history.back();
  }

  @ViewChild('modal') modal: ActionModalComponent;
  showModal(tpl) {
    this.modal.createComponentModal(tpl)
  }
  deleteItem() {
    this.employeeService.delete(this.id).subscribe(res => {
      this.toast.success(SUCCESS_MSG.delete);
      this.close();
    }, _ => {
      this.modal.close();
    });
  }
}
