import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_CONST } from 'src/app/core/router.config';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  ROUTER_CONST = ROUTER_CONST;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  nav() {
    this.router.navigate([this.ROUTER_CONST.APARTMENT])
  }
}
