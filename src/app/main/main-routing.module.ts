import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectComponent } from './component/redirect/redirect.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [
      {
        path: "dashboard", loadChildren: () => import('./child/dashboard/dashboard.module').then(x => x.DashboardModule)
      },
      {
        path: "block", loadChildren: () => import('./child/block/block.module').then(x => x.BlockModule)
      },
      {
        path: "apartment", loadChildren: () => import('./child/apartment/apartment.module').then(x => x.ApartmentModule)
      },
      {
        path: "resident", loadChildren: () => import('./child/resident/resident.module').then(x => x.ResidentModule)
      },
      {
        path: "vehicle", loadChildren: () => import('./child/vehicle/vehicle.module').then(x => x.VehicleModule)
      },
      {
        path: "service", loadChildren: () => import('./child/service/service.module').then(x => x.ServiceModule)
      },
      {
        path: "bill", loadChildren: () => import('./child/bill/bill.module').then(x => x.BillModule)
      },
      {
        path: "redirect", component: RedirectComponent
      },
      {
        path: "", redirectTo: "dashboard", pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
