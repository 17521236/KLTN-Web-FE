import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apt'
})
export class AptPipe implements PipeTransform {

  transform(value: unknown, apts): unknown {
    return apts.find(x => x._id === value).name || '---';  }

}
