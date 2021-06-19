import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { PATTERN } from 'src/app/core/pattern';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { RESIDENT_TYPE_LIST } from 'src/app/core/system.config';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { ToastrService } from 'ngx-toastr';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { ApartmentService } from '../../../apartment/service/apartment.service';
import { BlockService } from '../../../block/service/block.service';
import { ResidentService } from '../../service/resident.service';

@Component({
  selector: 'app-add-resident',
  templateUrl: './add-resident.component.html',
  styleUrls: ['./add-resident.component.scss']
})
export class AddResidentComponent implements OnInit {

  ERROR_MSG = ERROR_MSG;
  @Input() tableHelper: TableHelper;
  apt$;
  blocks$ = this.blockService.getBlocks('',0,999).pipe(map((x: any) =>  x.items.map(item => new DropdownItem(item._id, item.name))));
  options = RESIDENT_TYPE_LIST.map(x => new DropdownItem(x.id, x.text));
  pending = false;


  form: FormGroup = this.fb.group({
    blockId: ["", Validators.required],
    aptId: ["", Validators.required],
    name: ["", Validators.required],
    type: ["", Validators.required],
    dateOfBirth:["", Validators.required],
    identityCard: ["",  Validators.pattern(PATTERN.ONLY_NUMBER)],
    phoneNumber:["",  Validators.pattern(PATTERN.ONLY_NUMBER)],
    email:["",  Validators.pattern(PATTERN.EMAIL)],
    note: "",
  });
  constructor(
    private fb: FormBuilder,
    private aptService: ApartmentService,
    private blockService: BlockService,
    private snackbarService: ToastrService,
    private residentService:ResidentService,
    public modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

  add() {
    this.pending = true;
    if (this.form.valid) {
      this.pending = false;
      this.residentService.addResident(this.form.value).subscribe(x => {
        this.modal.closeAll();
        this.tableHelper.next();
        this.snackbarService.success(SUCCESS_MSG.add);
      }, _=> {
        this.pending=false;
        this.modal.closeAll()
      })
    }
  }

  blockSelected(e) {
    this.apt$ = this.aptService.getApartment(0, 999, null, e).pipe(map((x: any) => x.items.map(item => new DropdownItem(item._id, item.name))));
    this.form.controls['aptId'].markAsTouched;
    this.form.controls['aptId'].setValue(null)
  }
}
