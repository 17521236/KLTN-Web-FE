export class PaginatorEvent {
    currentPage: number;
    pageSize: number;

    constructor(currentPage: number = 1, pageSize: number = 5) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
    }

    getStart() {
        return this.currentPage * this.pageSize - this.pageSize;
    }
    getLimit() {
        return this.pageSize;
    }
    genStartLimit() {
        return {
            start: this.getStart(),
            limit: this.pageSize
        }
    }
}