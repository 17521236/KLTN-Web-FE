import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'block'
})
export class BlockPipe implements PipeTransform {

  transform(value: unknown, blocks): unknown {
    return blocks.find(x => x._id === value).name || '---';
  }

}
