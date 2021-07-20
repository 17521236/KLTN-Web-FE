import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from 'src/app/shared/abstracts/store';
import { ApartmentService } from '../../../apartment/service/apartment.service';
import { BlockService } from '../../../block/service/block.service';
import { BillService, IAddBillReq } from '../../service/bill.service';

export interface IBlock {
  _id: string;
  name: string;
  description: string;
}

export interface IApartment {
  area: string;
  blockId: string;
  blockName: string;
  description: string;
  name: string;
  type: string;
  _id: string;
}

export interface IService {
  cost: number;
  unit: string;
  quantity?: number;
}

export interface ICost {
  ELECTRONIC: IService;
  WATER: IService;
  INTERNET: IService;
  SERVICE: IService;
  // MANAGER: IService;
  PARKING_BYCIRCLE: IService;
  PARKING_MOTORBIKE: IService;
  PARKING_CAR: IService;
  ORTHER: IService;
}

export interface IBillAddStoreState {
  blocks: Array<IBlock>;
  apts: Array<IApartment>;
  aptSelected: IApartment;
  cost: ICost;
}
@Injectable()
export class BillAddStoreService extends Store<IBillAddStoreState>{

  readonly block$ = this.state$.pipe(map(res => res.blocks));
  readonly apts$ = this.state$.pipe(map(res => res.apts));
  readonly aptSelected$ = this.state$.pipe(map(res => res.aptSelected));
  readonly cost$ = this.state$.pipe(map(res => res.cost));

  constructor(
    private blockService: BlockService,
    private aptService: ApartmentService,
    private billService: BillService

  ) {
    super({
      blocks: [],
      apts: [],
      aptSelected: null,
      cost: null
    });
    this.init();
  }

  init() {
    this.blockService.getBlocks('', 0, 9999)
      .subscribe((res: any) => this.state = { ...this.state, blocks: res.items });
  }

  selectBlock(blockId) {
    this.aptService.getApartment(0, 9999, '', blockId)
      .subscribe((res: any) => this.state = { ...this.state, apts: res.items, aptSelected: null });
  }

  selectApt(id) {
    const aptSelected = this.state.apts.find(x => x._id === id) || null;
    this.billService.getCostByAptId(id).subscribe((res: ICost) => {
      this.state = { ...this.state, aptSelected, cost: res };
    });
  }

  add(data: IAddBillReq) {
    return this.billService.create(data);
  }
}
