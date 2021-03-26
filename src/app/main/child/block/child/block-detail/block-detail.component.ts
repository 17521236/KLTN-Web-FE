import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { SUCCESS_MSG } from 'src/app/core/success-msg';
import { AppSnackbarService } from 'src/app/shared/service/snackbar.service';
import { BlockService } from '../../service/block.service';

@Component({
  selector: 'app-block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.scss']
})

export class BlockDetailComponent implements OnInit {

  state$ = this.route.data.pipe(map(data => data.state));
  id$ = this.route.params.pipe(map(params => params.id));
  block$ = this.id$.pipe(
    switchMap(id => this.blockService.getBlockById(id)),
    map((block: any) => {
      this.buildFormDetail(block);
      return block;
    })
  );

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private blockService: BlockService,
    private snackbarService: AppSnackbarService
  ) {}
  ngOnInit(): void {
  }

  buildFormDetail(block) {
    this.form = this.fb.group({
      name: [block.name, Validators.required],
      description: block.description,
      apartmentTotal: block.totalApartment,
      residentTotal: block.totalResident
    });
  }
  update() {
    if (this.form.valid) {
      this.blockService.updateBlock(this.route.snapshot.params.id, this.form.value).subscribe(res => {
        this.form.markAsPristine();
        this.snackbarService.success(SUCCESS_MSG.edit);
      })
    }
  }
  close() {
    window.history.back();
  }
}
