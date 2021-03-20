import { Component, OnInit } from '@angular/core';
import { BlockService } from './service/block.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  showRightMenu = false;
  blocks$ = this.blockService.getBlocks('blockName',0,5);

  constructor(private blockService: BlockService) { }

  ngOnInit(): void {
    
  }

  onPageChange($event) {

  }
}
