import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RedirectComponent } from './component/redirect/redirect.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [
      {
        path: "dashboard", loadChildren: () => import('./child/dashboard/dashboard.module').then(x => x.DashboardModule), canActivate:[AuthGuard]
      },
      {
        path: "block", loadChildren: () => import('./child/block/block.module').then(x => x.BlockModule), canActivate:[AuthGuard]
      },
      {
        path: "apartment", loadChildren: () => import('./child/apartment/apartment.module').then(x => x.ApartmentModule), canActivate:[AuthGuard]
      },
      {
        path: "resident", loadChildren: () => import('./child/resident/resident.module').then(x => x.ResidentModule), canActivate:[AuthGuard]
      },
      {
        path: "vehicle", loadChildren: () => import('./child/vehicle/vehicle.module').then(x => x.VehicleModule), canActivate:[AuthGuard]
      },
      {
        path: "service", loadChildren: () => import('./child/service/service.module').then(x => x.ServiceModule), canActivate:[AuthGuard]
      },
      {
        path: "bill", loadChildren: () => import('./child/bill/bill.module').then(x => x.BillModule), canActivate:[AuthGuard]
      },
      {
        path: "employee", loadChildren: () => import('./child/employee/employee.module').then(x => x.EmployeeModule), canActivate:[AuthGuard]
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
