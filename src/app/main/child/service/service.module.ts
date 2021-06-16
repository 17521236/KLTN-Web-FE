import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from './service.component';
import { ServiceListComponent } from './child/service-list/service-list.component';
import { ServiceDetailComponent } from './child/service-detail/service-detail.component';
import { ServiceRoutingModule } from './service-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceAddComponent } from './component/service-add/service-add.component';
// import { ServiceComponent } from './service/service.component';



@NgModule({
  declarations: [ServiceComponent, ServiceListComponent, ServiceDetailComponent, ServiceAddComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    SharedModule
  ]
})
export class ServiceModule { }
