import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resident'
})
export class ResidentPipe implements PipeTransform {

  transform(value: unknown, residents): unknown {
    return residents.find( x => x._id === value).name || '---';
  }

}
