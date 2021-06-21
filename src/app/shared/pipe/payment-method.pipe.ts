import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentMethod'
})
export class PaymentMethodPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value == '1')
      return 'PayPal';
    if (value == '2') {
      return 'Momo'
    }
    if (value == '3') {
      return 'Internet banking'
    }
    return '----';
  }

}
