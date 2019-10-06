import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TextDialogComponent } from './text-dialog/text-dialog.component';

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
  breakpoints = {
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  };
  defaultSettings = {
    '.header': {
      height: { xs: '3rem' },
      padding: { xs: '0.5rem' }
    },
    '.margin': {
      width: { xs: '1rem' }
    },
    '.main': {
      padding: { xs: '1rem' }
    },
    h1: {
      'margin-top': { xs: '0rem' },
      'margin-bottom': { xs: '0.3rem' },
      'padding-top': { xs: '0rem' },
      'padding-bottom': { xs: '0rem' },
      'font-size': { xs: '2rem' },
      'line-height': { xs: '2rem' },
      'letter-spacing': { xs: '0rem' },
    },
    h2: {
      'margin-top': { xs: '0rem' },
      'margin-bottom': { xs: '0.3rem' },
      'padding-top': { xs: '0rem' },
      'padding-bottom': { xs: '0rem' },
      'font-size': { xs: '1.5rem' },
      'line-height': { xs: '1.5rem' },
      'letter-spacing': { xs: '0rem' },
    },
    h3: {
      'margin-top': { xs: '0rem' },
      'margin-bottom': { xs: '0.3rem' },
      'padding-top': { xs: '0rem' },
      'padding-bottom': { xs: '0rem' },
      'font-size': { xs: '1.17rem' },
      'line-height': { xs: '1.17rem' },
      'letter-spacing': { xs: '0rem' },
    },
    h4: {
      'margin-top': { xs: '0rem' },
      'margin-bottom': { xs: '0.3rem' },
      'padding-top': { xs: '0rem' },
      'padding-bottom': { xs: '0rem' },
      'font-size': { xs: '1rem' },
      'line-height': { xs: '1rem' },
      'letter-spacing': { xs: '0rem' },
    },
    h5: {
      'margin-top': { xs: '0rem' },
      'margin-bottom': { xs: '0.3rem' },
      'padding-top': { xs: '0rem' },
      'padding-bottom': { xs: '0rem' },
      'font-size': { xs: '0.83rem' },
      'line-height': { xs: '0.83rem' },
      'letter-spacing': { xs: '0rem' },
    },
    h6: {
      'margin-top': { xs: '0rem' },
      'margin-bottom': { xs: '0.3rem' },
      'padding-top': { xs: '0rem' },
      'padding-bottom': { xs: '0rem' },
      'font-size': { xs: '0.67rem' },
      'line-height': { xs: '0.67rem' },
      'letter-spacing': { xs: '0rem' },
    },
    p: {
      'margin-top': { xs: '0rem' },
      'margin-bottom': { xs: '0.3rem' },
      'padding-top': { xs: '0rem' },
      'padding-bottom': { xs: '0rem' },
      'font-size': { xs: '1rem' },
      'line-height': { xs: '1rem' },
      'letter-spacing': { xs: '0rem' },
    },
    grid: {
      columns: { xs: 1, sm: 2, md: 3, lg: 4 },
      gap: { xs: '1rem' }
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
    for (const el of Object.keys(this.settings)) {
      for (const prop of Object.keys(this.settings[el])) {
        this.applySetting(size, el, prop, el, prop);
      }
    }
    this.applySetting(size, '.content', 'top', '.header', 'height');
    this.applySetting(size, '.main', 'left', '.margin', 'width');
    this.applySetting(size, '.main', 'right', '.margin', 'width');
    this.applySetting(size, '.grid div', 'margin-right', 'grid', 'gap');
    this.applySetting(size, '.grid div', 'margin-bottom', 'grid', 'gap');
    this.applySetting(size, '.grid', 'margin-right', '-' + this.getSizeVal(size, 'grid', 'gap'));
    const cellWidth = 'calc(' + 100 / this.settings.grid.columns.xs + '% - ' + this.settings.grid.gap.xs + ')';
    this.applySetting(size, '.grid div', 'width',
      'calc(' + 100 / this.getSizeVal(size, 'grid', 'columns') + '% - ' + this.getSizeVal(size, 'grid', 'gap') + ')');
  }

  applySetting(size: string, selector: string, cssProp: string, setting: string, settingProp: string = null) {
    const elems = document.querySelectorAll(selector);
    for (const el of Object.keys(elems)) {
      if (settingProp) {
        this.renderer.setStyle(elems[el], cssProp, this.getSizeVal(size, setting, settingProp));
      } else {
        this.renderer.setStyle(elems[el], cssProp, setting);
      }
    }
  }

  getSizeVal(size: string, setting: string, settingProp: string) {
    switch (size) {
      case 'xl':
        if (this.settings[setting][settingProp].xl) {
          return this.settings[setting][settingProp].xl;
        } else if (this.settings[setting][settingProp].lg) {
          return this.settings[setting][settingProp].lg;
        } else if (this.settings[setting][settingProp].md) {
          return this.settings[setting][settingProp].md;
        } else if (this.settings[setting][settingProp].sm) {
          return this.settings[setting][settingProp].sm;
        }
        break;
      case 'lg':
        if (this.settings[setting][settingProp].lg) {
          return this.settings[setting][settingProp].lg;
        } else if (this.settings[setting][settingProp].md) {
          return this.settings[setting][settingProp].md;
        } else if (this.settings[setting][settingProp].sm) {
          return this.settings[setting][settingProp].sm;
        }
        break;
      case 'md':
        if (this.settings[setting][settingProp].md) {
          return this.settings[setting][settingProp].md;
        } else if (this.settings[setting][settingProp].sm) {
          return this.settings[setting][settingProp].sm;
        }
        break;
      case 'sm':
        if (this.settings[setting][settingProp].sm) {
          return this.settings[setting][settingProp].sm;
        }
    }
    return this.settings[setting][settingProp].xs;
  }

  getStyles(el: string) {
    let ret = '';
    for (const prop of Object.keys(this.settings[el])) {
      if (ret !== '') {
        ret += ', ';
      }
      ret += prop + ': ' + this.settings[el][prop].xs;
    }
    return ret;
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
    if (windowWidth < this.breakpoints.sm) {
      return 'xs';
    } else if (this.windowWidth < this.breakpoints.md) {
      return 'sm';
    } else if (this.windowWidth < this.breakpoints.lg) {
      return 'md';
    } else if (this.windowWidth < this.breakpoints.xl) {
      return 'lg';
    } else {
      return 'xl';
    }
  }

  setTextSettings(title: string, el: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        title,
        settings: null
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
      if (result === 'reset') {
        window.localStorage.removeItem('settings');
        this.settings = this.defaultSettings;
        this.applySettings(this.getSize());
      }
    });
  }

  copySettings() {
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
}
