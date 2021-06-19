
export class JSUtils {
  public static commonHandleError(error, msgService) {
    console.log(error)
    switch (error.status) {
      case 400:
        msgService.error(error.error.msg);

        // msgService.add({
        //   msg: error.error.msg,
        //   timeout: 3000,
        //   background: '#000000',
        //   color: '#ffffff',
        // });

        break;
      default:
        // msgService.error('unknow error')
    msgService.error('unknow error');
        break;
    }
  }
}