import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'app-typography-dialog',
  templateUrl: './typography-dialog.component.html',
  styleUrls: ['./typography-dialog.component.scss']
})
export class TypographyDialogComponent implements OnInit {
  valueAscOrder = this.tools.valueAscOrder;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tools: ToolsService) { }

  ngOnInit() {
  }

  setUnits(units: string) {
    this.data.units = units;
    for (const prop of Object.keys(this.data.settings)) {
      for (const breakpoint of Object.keys(this.data.settings[prop])) {
        const val = Number(this.data.settings[prop][breakpoint]);
        if (!isNaN(val)) {
          switch (units) {
            case 'rem':
              this.data.settings[prop][breakpoint] /= 16;
              break;
            case 'px':
              this.data.settings[prop][breakpoint] *= 16;
              break;
            default:
              throw new Error('Unsupported unit: ' + units);
          }
        }
      }
    }
  }
}
