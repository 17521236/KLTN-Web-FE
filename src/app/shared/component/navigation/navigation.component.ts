import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_CONST } from 'src/app/core/router.config';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  ROUTER_CONST = ROUTER_CONST;
  role$ = this.authService.role$;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  navProfile() {
    this.authService._id$.subscribe(id => {
      this.router.navigate([this.ROUTER_CONST.EMPLOYEE.DETAIL(id)])
    })
  }
}
