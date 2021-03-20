export class PaginatorEvent {
    currentPage: number;
    pageSize: number;

    constructor(currentPage: number, pageSize: number) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
    }

    getFirstRow() {
        return this.currentPage * this.pageSize - this.pageSize;
    }
}