import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../../sevice/sevice.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  form: FormGroup;
  ERROR_MSG = ERROR_MSG;
  pending = false;
  id: string = "";

  constructor(
    private fb: FormBuilder,
    private sService: ServiceService,
    private snackbarService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", Validators.required],
      cost: ["", Validators.required],
      unit: ["", Validators.required],
      desc: ""
    })
    this.sService.getOne(this.route.snapshot.params['id']).subscribe((data: any) => {
      this.id = data._id;
      this.form.patchValue(data);
    })
  }
  close() {
    setTimeout(() => this.router.navigate([ROUTER_CONST.SERVICE.LIST]))
  }

  update() {
    if (this.form.valid) {
      this.sService.update(this.form.value, this.id).subscribe(_ => {
        this.form.markAsPristine();
        this.snackbarService.success(SUCCESS_MSG.edit);
      })
    }
  }

  deleteItem() {
    this.sService.deleteOne(this.id).subscribe(_ => {
      this.snackbarService.success(SUCCESS_MSG.delete);
      this.close();
    })
  }
}
