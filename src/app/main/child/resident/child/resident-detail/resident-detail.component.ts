import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { PATTERN } from 'src/app/core/pattern';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { RESIDENT_TYPE_LIST } from 'src/app/core/system.config';
import { ActionModalComponent } from 'src/app/shared/component/action-modal/action-modal.component';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { ToastrService } from 'ngx-toastr';
import { ApartmentService } from '../../../apartment/service/apartment.service';
import { BlockService } from '../../../block/service/block.service';
import { ResidentAccountService } from '../../service/resident-account.service';
import { ResidentService } from '../../service/resident.service';
import { isEqual } from 'lodash';
@Component({
  selector: 'app-resident-detail',
  templateUrl: './resident-detail.component.html',
  styleUrls: ['./resident-detail.component.scss']
})
export class ResidentDetailComponent implements OnInit {
  form: FormGroup;
  ERROR_MSG = ERROR_MSG;
  @ViewChild('hasEmail') hasEmail;
  @ViewChild('deleteConfirm') deleteConfirm;

  pending = false;
  id = this.route.snapshot.params.id;
  apt$;
  resident$ = this.residentService.getResidentById(this.id).pipe(
    tap((res: any) => {
      console.log('resident Detail:', res);
      this.apt$ = this.aptService.getApartment(0, 999, null, res.blockId)
        .pipe(map((x: any) => x.items.map(item => new DropdownItem(item._id, item.name))));
      this.buildFormDetail(res);
    })
  );
  blocks$ = this.blockService.getBlocks('', 0, 999).pipe(map((x: any) => x.items.map(item => new DropdownItem(item._id, item.name))));
  options = RESIDENT_TYPE_LIST.map(x => new DropdownItem(x.id, x.text));
  @ViewChild('modal') modal: ActionModalComponent;
  disabledDate = (date) => {
    return new Date().getTime() < new Date(date).getTime();
  }
  prevForm;
  // form for account

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private aptService: ApartmentService,
    private blockService: BlockService,
    private snackbarService: ToastrService,
    private residentService: ResidentService

  ) {
    // this.buildFormAccount();
  }

  ngOnInit(): void {

  }

  isEqual() {
    return isEqual(this.prevForm, this.form.value);
  }
  buildFormDetail(apt) {
    this.form = this.fb.group({
      name: [apt.name, Validators.required],
      blockId: [apt.blockId, Validators.required],
      aptId: [apt.aptId, Validators.required],
      type: [apt.type, Validators.required],
      identityCard: [apt.identityCard, Validators.pattern(PATTERN.ONLY_NUMBER)],
      dateOfBirth: [apt.dateOfBirth, Validators.required],
      phoneNumber: [apt.phoneNumber, Validators.pattern(PATTERN.ONLY_NUMBER)],
      email: [apt.email, Validators.pattern(PATTERN.EMAIL)],
      totalVehicle: apt.totalVehicle,
      note: apt.note
    });
    this.prevForm = this.form.value;
  }

  buildFormAccount() {

  }

  update() {
    if (this.form.valid) {
      this.pending = true;
      this.residentService.updateResident(this.route.snapshot.params.id, this.form.value).subscribe(res => {
        setTimeout(() => this.refresh());
        this.snackbarService.success(SUCCESS_MSG.edit);
        this.pending = false;
      }, _ => {
        this.pending = false;
        this.form.patchValue(this.prevForm);
      }
      );
    }
  }
  close() {
    this.modal.close();
    setTimeout(() => {
      this.router.navigate([ROUTER_CONST.RESIDENT.LIST])
    }, 0);
  }

  blockSelected(e) {
    this.apt$ = this.aptService.getApartment(0, 999, null, e)
      .pipe(map((x: any) => x.items.map(item => new DropdownItem(item._id, item.name))));
    this.form.controls['aptId'].markAsTouched();
    this.form.controls['aptId'].setValue(null);
  }

  updateAccount() {

  }

  openModal(resident) {
    if (new RegExp(PATTERN.EMAIL).test(resident.email)) {
      this.modal.createComponentModal(this.hasEmail, {}, false, 'alert');
    }
    else {
      this.snackbarService.warning('Bạn cần cập nhật Email trước khi tạo tài khoản');
    }
  }
  createAccount() {
    this.pending = true;
    this.residentService.createAccount(this.id).subscribe((x: any) => {
      this.modal.close();
      this.snackbarService.success(SUCCESS_MSG.create_resident_account);
      setTimeout(() => this.refresh());
      this.pending = false;
    }, _ => {
      this.modal.close();
      this.pending = false;
    });
  }
  resetPassword() {
    this.pending = true;
    this.residentService.resetPassword(this.id).subscribe(_ => {
      this.snackbarService.success(SUCCESS_MSG.reset_pass);
      // setTimeout(() => this.refresh())
      this.pending = false;
    });
  }
  refresh() {
    this.router.navigate([ROUTER_CONST.REDIRECT]).then(value => {
      this.router.navigate([ROUTER_CONST.RESIDENT.DETAIL(this.id)]);
    });
  }
  openModalConfirm() {
    this.modal.createComponentModal(this.deleteConfirm, {}, false, 'alert')
  }
  deleteAccount() {
    this.pending = true;
    this.residentService.deleteAccount(this.id).subscribe(x => {
      this.snackbarService.success(SUCCESS_MSG.delete);
      this.modal.close();
      setTimeout(() => this.refresh());
      this.pending = false;
    }, _ => this.pending = false);
  }


  // delete

  showModal(tpl) {
    this.modal.createComponentModal(tpl);
  }
  deleteItem() {
    this.residentService.delete(this.id).subscribe(_ => {
      this.snackbarService.success(SUCCESS_MSG.delete);
      this.close();
    }, _ => {
      this.modal.close();
    });
  }
}
