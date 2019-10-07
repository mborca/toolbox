import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {
  valueAscOrder = this.tools.valueAscOrder;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private tools: ToolsService) { }

  ngOnInit() {
  }

}
