import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { SharedModule } from '../shared/shared.module';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzIconModule,
    SharedModule
  ]
})
export class MainModule { }
