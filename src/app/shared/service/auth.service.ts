import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { Store } from '../abstracts/store';
import { UserService } from './user.service';
export class User {
  _id: string = '';
  email: string = '';
  name: string = '';
  role: string = '';
  constructor(obj?: any) {
    this._id = obj?._id || '';
    this.email = obj?.email || '';
    this.name = obj?.name || '';
    this.role = obj?.role || '';
  }
}
export interface AuthState {
  currentUser: User
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Store<AuthState> {
  readonly isLoggedIn$ = this.state$.pipe(
    map((state: AuthState) => {
      return !!state.currentUser;
    })
  );

  role$ = this.state$.pipe(map(x => x.currentUser.role));
  _id$ = this.state$.pipe(map(x => x.currentUser._id))

  constructor(private router: Router, private userService: UserService) {
    super({
      currentUser: null
    });
  }
  // login
  login(data) {
    return this.userService.login(data).pipe(
      tap(res => {
        const user = new User(res);
        sessionStorage.setItem('user', JSON.stringify(user));
        this.state = { ...this.state, currentUser: user };
        this.router.navigate([ROUTER_CONST.DASHBOARD]);
      })
    )
  }

  logout() {
    sessionStorage.removeItem('user');
    this.state = { ...this.state, currentUser: null };
    this.router.navigate(['/not-auth']);
  }

}
