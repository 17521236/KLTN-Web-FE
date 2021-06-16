import { BehaviorSubject, Observable } from 'rxjs/';

export class Store<T> {
  private readonly _state;
  readonly state$: Observable<T>;

  constructor(init: T = null) {
    this._state = new BehaviorSubject<T>(init);
    this.state$ = this._state.asObservable();
  }

  get state() {
    return this._state.getValue();
  }
  set state(val: T) {
    this._state.next(val);
  }
}
