import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from 'src/app/shared/abstracts/store';
import { ApartmentService } from '../../../apartment/service/apartment.service';
import { BlockService } from '../../../block/service/block.service';
import { BillService, IFilterBill } from '../../service/bill.service';

export interface IBillRes {
  _id: string,
  apartmentId: string,
  pmId: string,
  date: number,
  status: string,
  amount: number,
}

export interface IBillListState {
  records: Array<IBillRes>,
  total: number,
  loading: boolean,
  apts: any[]
}

@Injectable()
export class BillListStoreService extends Store<IBillListState> {

  records$ = this.state$.pipe(map(x => x.records));
  total$ = this.state$.pipe(map(x => x.total));
  loading$ = this.state$.pipe(map(x => x.loading))
  blocks$ = this.blockService.getBlocks('', 0, 999);
  apts$ = this.state$.pipe(map(x => x.apts));

  constructor(
    private billService: BillService,
    private blockService: BlockService,
    private aptService: ApartmentService
  ) {
    super({
      records: [],
      total: 0,
      loading: true,
      apts: []
    })
  }

  onPageChange(filter: IFilterBill) {
    this.state = { ...this.state, loading: true }
    this.billService.getList(filter).subscribe((res: any) => {
      this.state = { ...this.state, records: res.result, total: res.total, loading: false }
    });
  }
  blockSelected(evt) {
    this.aptService.getApartment(0, 999, '', evt).subscribe((res: any) => {
      this.state = { ...this.state, apts: res.items }
    });
  }
}
