export const HELPER = {
  copyToClipboard: str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  },
  isToday(day) {
    const d = new Date(day);
    const d1 = new Date();
    return Math.abs(d.getTime() - d1.getTime()) < 86400000 && d.getDate() === d1.getDate();
  },
  isYesterday(day) {
    const tomorrow = day + 86400000;
    return HELPER.isToday(tomorrow);
  },
  findOneById(array: any[], id) {
    return array.find(x => x.id == id);
  },
  groupByKey(array: Array<any>, key: string) {
    return array.reduce((r, a) => {
      r[a[key]] = r[a[key]] || [];
      r[a[key]].push(a);
      return r;
    }, Object.create(null));
  }
}