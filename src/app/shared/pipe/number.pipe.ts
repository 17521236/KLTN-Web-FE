import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return Number(value).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'}).replace('₫','');
  }

}
