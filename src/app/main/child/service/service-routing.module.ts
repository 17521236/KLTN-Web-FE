import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceDetailComponent } from './child/service-detail/service-detail.component';
import { ServiceListComponent } from './child/service-list/service-list.component';
import { ServiceComponent } from './service.component';
const routes: Routes = [
  {
    path: "", component: ServiceComponent, children: [
      {
        path: "list", component: ServiceListComponent
      },
      {
        path: "detail/:id", component: ServiceDetailComponent
      },
      {
        path: "", redirectTo: "list", pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
