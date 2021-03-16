import * as moment from 'moment';

export class JSUtils {
  public static hexToBase64(hexstring) {
    return btoa(hexstring.match(/\w{2}/g).map(function (a) {
      return String.fromCharCode(parseInt(a, 16));
    }).join(''));
  }
  // implement static method here
  public static commonHandleError(observable) {
    return (error) => {
      // let msg = JSUtils.formatErrorMessage(error);

      // if(toast){
      //   if(msg) toast.error(msg);
      //   else toast.error("An unknown error has occurred.");
      // }

      observable.error(error);
    }
  }

  public static getUnixTimeOfDate(date, mode) {
    const momentDate = moment(date);
    let time = 0;
    switch (mode) {
      case 'begin':
        time = momentDate.startOf('day').valueOf();
        break;
      case 'endof':
        time = momentDate.endOf('day').valueOf();
        break;
    }

    return time;
  }
  public static getCardTypeIcon(cardNo) {
    if (!cardNo) {
      return 'sprite-card';
    }
    if (cardNo.toString().startsWith('4')) {
      return 'sprite-visa';
    }
    if (cardNo.toString().startsWith('34') || cardNo.toString().startsWith('37')) {
      return 'sprite-amex';
    }
    if (cardNo.toString().length >= 2) {
      let num = Number(cardNo.toString().substring(0, 2));
      if (num >= 51 && num <= 55) {
        return 'sprite-master';
      }
    }
    return 'sprite-card';
  }
}