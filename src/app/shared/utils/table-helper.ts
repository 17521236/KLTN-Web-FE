import { FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { PaginatorEvent } from "../component/paginator/paginator-event.model";

export class TableHelper {
    paginator: PaginatorEvent = new PaginatorEvent();
    query$;
    filterForm: FormGroup = new FormGroup({});
    isLoading = false;
    constructor() {
        this.query$ = new BehaviorSubject(this);
    }
    next() {
        this.isLoading = true;
        this.query$.next(this);
    }
    onPageChange(e: PaginatorEvent) {
        this.paginator = e;
        this.next();
    }
}
