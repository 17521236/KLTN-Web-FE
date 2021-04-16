import { FormGroup } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { PaginatorEvent } from "../component/paginator/paginator-event.model";

export class TableHelper {
    paginator: PaginatorEvent = new PaginatorEvent();
    query$;
    filterForm: FormGroup = new FormGroup({});
    constructor() {
        this.query$ = new BehaviorSubject(this);
    }
    next() {
        this.query$.next(this)
    }
    onPageChange(e: PaginatorEvent) {
        this.paginator = e;
        this.next();
    }
}