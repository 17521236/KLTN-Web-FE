import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentComponent } from './resident.component';
import { ResidentRoutingModule } from './resident-routing.module';
import { ResidentListComponent } from './child/resident-list/resident-list.component';
import { ResidentDetailComponent } from './child/resident-detail/resident-detail.component';
import { AddResidentComponent } from './component/add-resident/add-resident.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResidentAccountService } from './service/resident-account.service';



@NgModule({
  declarations: [ResidentComponent, ResidentListComponent, ResidentDetailComponent, AddResidentComponent],
  imports: [
    CommonModule,
    ResidentRoutingModule,
    SharedModule
  ]
  ,providers:[ResidentAccountService]
})
export class ResidentModule { }
