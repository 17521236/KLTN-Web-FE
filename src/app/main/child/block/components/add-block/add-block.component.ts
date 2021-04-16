import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ERROR_MSG } from 'src/app/core/error-msg.config';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { AppSnackbarService } from 'src/app/shared/service/snackbar.service';
import { BlockService } from '../../service/block.service';

@Component({
  selector: 'app-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.scss']
})
export class AddBlockComponent implements OnInit {

  ERROR_MSG = ERROR_MSG;
  form: FormGroup = this.fb.group({
    name: ["", Validators.required],
    description: "",
  });
  pending = false;
  @Output() success = new EventEmitter();

  constructor(private fb: FormBuilder, private blockService: BlockService, private snackbarService: AppSnackbarService,public modal:NzModalService) { }

  ngOnInit(): void {
  }

  add() {
    this.pending = true;
    if (this.form.valid) {
      this.pending = false;
      this.blockService.addBlock(this.form.value).subscribe(x => {
        this.modal.closeAll();
        this.success.emit();
        this.snackbarService.success(SUCCESS_MSG.add);
      })
    }
  }
}
