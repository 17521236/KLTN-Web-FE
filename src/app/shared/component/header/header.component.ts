import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ROUTER_CONST } from 'src/app/core/router.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {

  pageName = '';
  routerSub: Subscription;

  constructor(
    private router: Router
  ) { }
  
  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  ngOnInit(): void {
    this.pageName = this.getPageName();
    this.routerSub = this.router.events.pipe(switchMap(() => timer(10))).subscribe(() => this.pageName = this.getPageName())
  }

  getPageName() {
    let x = '';
    switch (this.router.url) {
      case ROUTER_CONST.DASHBOARD: {
        x = 'Dashboard';
        break;
      }
      case ROUTER_CONST.BLOCK: {
        x = 'Block';
        break;
      }
      case ROUTER_CONST.APARTMENT: {
        x = 'Căn hộ';
        break;
      }
      case ROUTER_CONST.RESIDENT: {
        x = 'Cư dân';
        break;
      }
      case ROUTER_CONST.VEHICLE: {
        x = 'Xe';
        break;
      }
      case ROUTER_CONST.SERVICE: {
        x = 'Dịch vụ';
        break;
      }
      default: {

      }
    }
    return x;
  }

}
