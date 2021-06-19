import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotAuthRoutingModule } from './not-auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NotAuthRoutingModule,
    SharedModule
  ]
})
export class NotAuthModule { }
