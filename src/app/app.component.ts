import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROUTER_CONST } from './core/router.config';
import { AuthService } from './shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    const user: any = JSON.parse(sessionStorage.getItem('user'));
    if (user?._id) {
      this.authService.state = { ...this.authService.state, currentUser: user };
      if(window.location.pathname === ROUTER_CONST.NOT_AUTH){
        this.router.navigate([ROUTER_CONST.DASHBOARD])
      }
      return;
    }
  }
}
