import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlockComponent } from './block.component';
import { BlockDetailComponent } from './child/block-detail/block-detail.component';
import { BlockListComponent } from './child/block-list/block-list.component';

const routes: Routes = [
  {
    path: "", component: BlockComponent, children: [
      {
        path: "list", component: BlockListComponent
      },
      {
        path: "detail/:id", component: BlockDetailComponent, data: { state: 'detail' }
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
export class BlockRoutingModule { }
