import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { PATTERN } from 'src/app/core/pattern';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { APARTMENT_TYPE_LIST } from 'src/app/core/system.config';
import { DropdownItem } from 'src/app/shared/component/dropdown/model/dropdown.model';
import { AppSnackbarService } from 'src/app/shared/service/snackbar.service';
import { TableHelper } from 'src/app/shared/utils/table-helper';
import { BlockService } from '../../../block/service/block.service';
import { ApartmentService } from '../../service/apartment.service';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.scss']
})
export class AddApartmentComponent implements OnInit {

  ERROR_MSG = ERROR_MSG;
  @Input() tableHelper: TableHelper;
  blocks$ = this.blockService.getBlocks('',0,999).pipe(map((x: any) =>  x.items.map(item => new DropdownItem(item._id, item.name))));
  options = APARTMENT_TYPE_LIST.map(x => new DropdownItem(x.id, x.text));
  
  form: FormGroup = this.fb.group({
    blockId: ["", Validators.required],
    name: ["", Validators.required],
    type: ["1", Validators.required],
    area: ["", [Validators.required, Validators.pattern(PATTERN.ONLY_NUMBER)]],
    description: "",
  });
  pending = false;
  constructor(
    private fb: FormBuilder,
    private apartmentService: ApartmentService,
    private blockService: BlockService,
    private snackbarService: AppSnackbarService,
    public modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

  add() {
    this.pending = true;
    if (this.form.valid) {
      this.pending = false;
      this.apartmentService.addApartment(this.form.value).subscribe(x => {
        this.modal.closeAll();
        this.tableHelper.next();
        this.snackbarService.success(SUCCESS_MSG.add);
      })
    }
  }
}
