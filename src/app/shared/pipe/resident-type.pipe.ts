import { Pipe, PipeTransform } from '@angular/core';
import { RESIDENT_TYPE_LIST } from 'src/app/core/system.config';

@Pipe({
  name: 'residentType'
})
export class ResidentTypePipe implements PipeTransform {

  transform(value: string): unknown {
    return RESIDENT_TYPE_LIST.find(x=>x.id === value).text;
  }

}
