import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { ToastrService } from 'ngx-toastr';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { ServiceService } from '../../sevice/sevice.service';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss']
})
export class ServiceAddComponent implements OnInit {
  @Input() tableHelper: TableHelper;

  form: FormGroup;
  ERROR_MSG = ERROR_MSG;
  pending = false;

  constructor(
    public modal: NzModalService,
    private fb: FormBuilder,
    private sService: ServiceService,
    private snackbarService: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      cost: ["", Validators.required],
      unit: ["", Validators.required],
      desc: ""
    })
  }

  submit() {
    if (this.form.valid) {
      this.sService.create(this.form.value).subscribe(_ => {
        this.modal.closeAll();
        this.tableHelper.next();
        this.snackbarService.success(SUCCESS_MSG.add);
      });
    }
  }
}
