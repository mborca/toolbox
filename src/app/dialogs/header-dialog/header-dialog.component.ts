import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-header-dialog',
  templateUrl: './header-dialog.component.html',
  styleUrls: ['../dialog.scss', './header-dialog.component.scss']
})
export class HeaderDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tools: ToolsService) { }

  ngOnInit() {
  }

}
