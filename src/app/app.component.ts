import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TextDialogComponent } from './text-dialog/text-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { isNumber } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  windowSize = '';
  windowWidth = 0;
  windowHeight = 0;
  headerWidth = 0;
  headerHeight = 0;
  contentWidth = 0;
  contentHeight = 0;
  marginLeftWidth = 0;
  marginLeftHeight = 0;
  marginRightWidth = 0;
  marginRightHeight = 0;
  defaultUnit = 'rem';
  defaultSettings = {
    layout: {
      responsive: {
        breakpoints: { xs: 600, sm: 960, md: 1280, lg: 1920, xl: Infinity }
      },
      header: {
        height: { xs: 3 },
        paddingHorizontal: { xs: 1 },
        paddingVertical: { xs: 0.5 }
      },
      content: {
        width: { xs: [ 'flexible', 1 ] },
        paddingHorizontal: { xs: 1 },
        paddingVertical: { xs: 0 }
      },
      grid: {
        columns: { xs: 1, sm: 2, md: 3, lg: 4 },
        gap: { xs: 1 }
      }
    },
    typography: {
      h1: {
        'margin-top': { xs: 0 },
        'margin-bottom': { xs: 0.3 },
        'padding-top': { xs: 0 },
        'padding-bottom': { xs: 0 },
        'font-size': { xs: 2 },
        'line-height': { xs: 2 },
        'letter-spacing': { xs: 0 },
      },
      h2: {
        'margin-top': { xs: 0 },
        'margin-bottom': { xs: 0.3 },
        'padding-top': { xs: 0 },
        'padding-bottom': { xs: 0 },
        'font-size': { xs: 1.5 },
        'line-height': { xs: 1.5 },
        'letter-spacing': { xs: 0 },
      },
      h3: {
        'margin-top': { xs: 0 },
        'margin-bottom': { xs: 0.3 },
        'padding-top': { xs: 0 },
        'padding-bottom': { xs: 0 },
        'font-size': { xs: 1.17 },
        'line-height': { xs: 1.17 },
        'letter-spacing': { xs: 0 },
      },
      h4: {
        'margin-top': { xs: 0 },
        'margin-bottom': { xs: 0.3 },
        'padding-top': { xs: 0 },
        'padding-bottom': { xs: 0 },
        'font-size': { xs: 1 },
        'line-height': { xs: 1 },
        'letter-spacing': { xs: 0 },
      },
      h5: {
        'margin-top': { xs: 0 },
        'margin-bottom': { xs: 0.3 },
        'padding-top': { xs: 0 },
        'padding-bottom': { xs: 0 },
        'font-size': { xs: 0.83 },
        'line-height': { xs: 0.83 },
        'letter-spacing': { xs: 0 },
      },
      h6: {
        'margin-top': { xs: 0 },
        'margin-bottom': { xs: 0.3 },
        'padding-top': { xs: 0 },
        'padding-bottom': { xs: 0 },
        'font-size': { xs: 0.67 },
        'line-height': { xs: 0.67 },
        'letter-spacing': { xs: 0 },
      },
      p: {
        'margin-top': { xs: 0 },
        'margin-bottom': { xs: 0.3 },
        'padding-top': { xs: 0 },
        'padding-bottom': { xs: 0 },
        'font-size': { xs: 1 },
        'line-height': { xs: 1 },
        'letter-spacing': { xs: 0 },
      }
    }
  };
  settings = this.defaultSettings;

  constructor(private renderer: Renderer2, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.settings = window.localStorage.getItem('settings')
      ? JSON.parse(window.localStorage.getItem('settings'))
      : this.defaultSettings;
    this.applySettings(this.getSize());
  }

  applySettings(size: string) {
    // Typography
    for (const el of Object.keys(this.settings.typography)) {
      for (const prop of Object.keys(this.settings.typography[el])) {
        this.applySetting(el, prop, this.getSizeVal(size, this.settings.typography[el][prop]));
      }
    }
    // Header
    this.applySetting('.header', 'height', this.getSizeVal(size, this.settings.layout.header.height));
    this.applySetting('.content', 'top', this.getSizeVal(size, this.settings.layout.header.height));
    // Spacing
    this.applySetting('.header', 'padding-top', this.getSizeVal(size, this.settings.layout.header.paddingVertical));
    this.applySetting('.header', 'padding-bottom', this.getSizeVal(size, this.settings.layout.header.paddingVertical));
    this.applySetting('.header', 'padding-left', this.getSizeVal(size, this.settings.layout.header.paddingHorizontal));
    this.applySetting('.header', 'padding-right', this.getSizeVal(size, this.settings.layout.header.paddingHorizontal));
    this.applySetting('.main', 'padding-top', this.getSizeVal(size, this.settings.layout.content.paddingVertical));
    this.applySetting('.main', 'padding-bottom', this.getSizeVal(size, this.settings.layout.content.paddingVertical));
    this.applySetting('.main', 'padding-left', this.getSizeVal(size, this.settings.layout.content.paddingHorizontal));
    this.applySetting('.main', 'padding-right', this.getSizeVal(size, this.settings.layout.content.paddingHorizontal));
    // Layout
    const width = this.getVal(size, this.settings.layout.content.width);
    const mode = width[0];
    let val = isNumber(width[1]) ? width[1] + this.defaultUnit : width[1];
    if (mode === 'fixed') {
      val = 'calc(50% - ' + val + ' / 2)';
    } else if (mode !== 'flexible') {
      throw new Error('Unsupported layout mode: ' + mode);
    }
    this.applySetting('.margin', 'width', val);
    this.applySetting('.main', 'left', val);
    this.applySetting('.main', 'right', val);
    // Grid
    const gap = this.getSizeVal(size, this.settings.layout.grid.gap);
    this.applySetting('.grid div', 'margin-right', gap);
    this.applySetting('.grid div', 'margin-bottom', gap);
    this.applySetting('.grid', 'margin-right', '-' + gap);
    this.applySetting('.grid div', 'width',
      'calc(' + 100 / this.getVal(size, this.settings.layout.grid.columns) + '% - ' + gap + ')');
  }

  applySetting(selector: string, prop: string, val: string) {
    const elems = document.querySelectorAll(selector);
    for (const el of Object.keys(elems)) {
      this.renderer.setStyle(elems[el], prop, val);
    }
  }

  getSizeVal(size: string, el: any) {
    const val = this.getVal(size, el);
    return isNumber(val) ? val + this.defaultUnit : val;
  }

  getVal(size: string, el: any) {
    const breakpoints = Object.keys(this.settings.layout.responsive.breakpoints);
    breakpoints.splice(breakpoints.indexOf(size) + 1);
    for (const breakpoint of breakpoints.reverse()) {
      if (el[breakpoint] != null) {
        return el[breakpoint];
      }
    }
    throw new Error('Base value (XS) is required for all settings!');
  }

  onResize() {
    this.windowWidth = document.querySelector('.page').clientWidth;
    this.windowHeight = document.querySelector('.page').clientHeight;
    this.headerWidth = document.querySelector('.page .header').clientWidth;
    this.headerHeight = document.querySelector('.page .header').clientHeight;
    this.contentWidth = document.querySelector('.page .main').clientWidth;
    this.contentHeight = document.querySelector('.page .main').clientHeight;
    this.marginLeftWidth = document.querySelector('.margin.left').clientWidth;
    this.marginLeftHeight = document.querySelector('.margin.left').clientHeight;
    this.marginRightWidth = document.querySelector('.margin.right').clientWidth;
    this.marginRightHeight = document.querySelector('.margin.right').clientHeight;
    this.windowSize = this.getSize();
    this.applySettings(this.windowSize);
  }

  getSize() {
    const windowWidth = document.querySelector('.page').clientWidth;
    for (const breakpoint of Object.keys(this.settings.layout.responsive.breakpoints)) {
      if (windowWidth < this.settings.layout.responsive.breakpoints[breakpoint]) {
        return breakpoint;
      }
    }
  }

  setTextSettings(title: string, el: string) {
    const dialogRef = this.dialog.open(TextDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        title,
        settings: this.settings.typography[el]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  resetSettings() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      height: '200px',
      data: {
        title: 'Reset Settings',
        text: 'Changes will be lost!'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        window.localStorage.removeItem('settings');
        this.settings = this.defaultSettings;
        this.applySettings(this.getSize());
      }
    });
  }

  exportSettings() {
    const el = document.createElement('textarea');
    el.style.position = 'fixed';
    el.style.left = '0';
    el.style.top = '0';
    el.style.opacity = '0';
    el.value = JSON.stringify(this.settings);
    document.body.appendChild(el);
    el.focus();
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.snackBar.open('Settings copied to clipboard!', 'Done', {
      duration: 2000
    });
  }

  saveSettings() {
    window.localStorage.setItem('settings', JSON.stringify(this.settings));
    this.snackBar.open('Setting saved!', 'Done', {
      duration: 2000
    });
  }

  info() {
    this.dialog.open(InfoDialogComponent, {
      width: '300px',
      height: '500px',
      data: {
        title: 'RESPONSIVE'
      }
    });
  }
}
