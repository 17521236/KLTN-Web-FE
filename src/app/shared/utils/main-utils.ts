
export class JSUtils {
  public static commonHandleError(error, msgService) {
    switch (error.status) {
      case 400:
        alert(error.error.msg);
        // msgService.add({
        //   msg: error.error.msg,
        //   timeout: 3000,
        //   background: '#000000',
        //   color: '#ffffff',
        // });
        
        break;
      default:
        alert('unknow error');
        break;
    }
  }
}