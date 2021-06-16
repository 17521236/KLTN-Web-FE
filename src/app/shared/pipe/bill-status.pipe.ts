import { Pipe, PipeTransform } from '@angular/core';
import { STATUS_BILL_LIST } from 'src/app/core/system.config';

@Pipe({
  name: 'billStatus'
})
export class BillStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return STATUS_BILL_LIST.find(x => x.id === value).name || 'notfound';
  }

}
