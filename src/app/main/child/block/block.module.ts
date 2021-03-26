import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block.component';
import { BlockRoutingModule } from './block-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlockListComponent } from './child/block-list/block-list.component';
import { BlockDetailComponent } from './child/block-detail/block-detail.component';
import { AddBlockComponent } from './components/add-block/add-block.component';



@NgModule({
  declarations: [BlockComponent, BlockListComponent, BlockDetailComponent, AddBlockComponent],
  imports: [
    CommonModule,
    BlockRoutingModule,
    SharedModule
  ]
})
export class BlockModule { }
