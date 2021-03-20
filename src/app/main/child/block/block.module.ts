import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block.component';
import { BlockRoutingModule } from './block-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [BlockComponent],
  imports: [
    CommonModule,
    BlockRoutingModule,
    SharedModule
  ]
})
export class BlockModule { }
