export class TableCheckBox {
    selectedList: Array<string | number> = [];
    private keyChecked: string;
    private key;
    isSelectAll: boolean;
    indeterminate: boolean;
    constructor(selecctedList: Array<string | number> = [], keyChecked: string = 'checked', key = 'id') {
        this.selectedList = selecctedList;
        this.keyChecked = keyChecked;
        this.key = key;
    }
    update(currentList) {
        this.isSelectAll = currentList.every(el => el[this.keyChecked]);
        this.indeterminate = !this.isSelectAll && currentList.find(el => el.checked);
    }
    onItemCheck(item, currentList) {
        if (item[this.keyChecked]) {
            this.selectedList.push(item[this.key]);
        } else {
            this.selectedList = this.selectedList.filter(el => el != item[this.key]);
        }
        this.isSelectAll = currentList.every(el => el[this.keyChecked]);
        this.indeterminate = !this.isSelectAll && currentList.find(el => el.checked);
    }
    updateAllChecked(currentList) {
        if (!this.isSelectAll) {
            currentList.forEach(item => {
                item[this.keyChecked] = false;
                this.selectedList = this.selectedList.filter(el => el != item[this.key]);
            });

        }
        else {
            currentList.forEach(item => {
                item[this.keyChecked] = true;
                if (this.selectedList.indexOf(item[this.keyChecked]) >= 0) {
                    this.selectedList.push(item[this.keyChecked]);
                }
            });
        }
    }
}