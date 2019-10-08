import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-grid-dialog',
  templateUrl: './grid-dialog.component.html',
  styleUrls: ['../dialog.scss', './grid-dialog.component.scss']
})
export class GridDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tools: ToolsService) { }

  ngOnInit() {
  }

}
