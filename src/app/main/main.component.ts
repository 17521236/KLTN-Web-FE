import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { NavItem } from './model/navigation-item.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      document.querySelector('.ant-layout-sider-trigger').innerHTML = `<span>Logout</span>`;
      document.querySelector('.ant-layout-sider-trigger').addEventListener('click', () => {
        this.authService.logout();
      })
    }, 0);
  }
}
