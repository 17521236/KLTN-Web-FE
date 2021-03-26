import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApartmentComponent } from './apartment.component';
import { ApartmentDetailComponent } from './child/apartment-detail/apartment-detail.component';
import { ApartmentListComponent } from './child/apartment-list/apartment-list.component';

const routes: Routes = [
  {
    path: "", component: ApartmentComponent, children: [
      {
        path: "list", component: ApartmentListComponent
      },
      {
        path: "detail/:id", component: ApartmentDetailComponent
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
export class ApartmentRoutingModule { }
