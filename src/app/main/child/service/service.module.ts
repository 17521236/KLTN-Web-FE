import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceComponent } from './service.component';
import { ServiceListComponent } from './child/service-list/service-list.component';
import { ServiceDetailComponent } from './child/service-detail/service-detail.component';
import { ServiceRoutingModule } from './service-routing.module';
// import { ServiceComponent } from './service/service.component';



@NgModule({
  declarations: [ServiceComponent, ServiceListComponent, ServiceDetailComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule
  ]
})
export class ServiceModule { }
