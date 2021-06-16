import { Pipe, PipeTransform } from '@angular/core';
import { VEHICLE_TYPE } from 'src/app/core/system.config';

@Pipe({
  name: 'vehicle'
})
export class VehiclePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return VEHICLE_TYPE.find(x => value == x.id).name;
  }

}
