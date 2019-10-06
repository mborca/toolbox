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
    sizes: {
      '.header': {
        height: { xs: '3rem', sm: null, md: null, lg: null, xl: null },
        padding: { xs: '0.5rem', sm: null, md: null, lg: null, xl: null }
      },
      '.margin': {
        width: { xs: '1rem', sm: null, md: null, lg: null, xl: null }
      },
      '.main': {
        padding: { xs: '1rem', sm: null, md: null, lg: null, xl: null }
      },
      h1: {
        'margin-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'margin-bottom': { xs: '0.3rem', sm: null, md: null, lg: null, xl: null },
        'padding-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'padding-bottom': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'font-size': { xs: '2rem', sm: null, md: null, lg: null, xl: null },
        'line-height': { xs: '2rem', sm: null, md: null, lg: null, xl: null },
        'letter-spacing': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
      },
      h2: {
        'margin-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'margin-bottom': { xs: '0.3rem', sm: null, md: null, lg: null, xl: null },
        'padding-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'padding-bottom': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'font-size': { xs: '1.5rem', sm: null, md: null, lg: null, xl: null },
        'line-height': { xs: '1.5rem', sm: null, md: null, lg: null, xl: null },
        'letter-spacing': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
      },
      h3: {
        'margin-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'margin-bottom': { xs: '0.3rem', sm: null, md: null, lg: null, xl: null },
        'padding-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'padding-bottom': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'font-size': { xs: '1.17rem', sm: null, md: null, lg: null, xl: null },
        'line-height': { xs: '1.17rem', sm: null, md: null, lg: null, xl: null },
        'letter-spacing': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
      },
      h4: {
        'margin-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'margin-bottom': { xs: '0.3rem', sm: null, md: null, lg: null, xl: null },
        'padding-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'padding-bottom': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'font-size': { xs: '1rem', sm: null, md: null, lg: null, xl: null },
        'line-height': { xs: '1rem', sm: null, md: null, lg: null, xl: null },
        'letter-spacing': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
      },
      h5: {
        'margin-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'margin-bottom': { xs: '0.3rem', sm: null, md: null, lg: null, xl: null },
        'padding-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'padding-bottom': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'font-size': { xs: '0.83rem', sm: null, md: null, lg: null, xl: null },
        'line-height': { xs: '0.83rem', sm: null, md: null, lg: null, xl: null },
        'letter-spacing': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
      },
      h6: {
        'margin-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'margin-bottom': { xs: '0.3rem', sm: null, md: null, lg: null, xl: null },
        'padding-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'padding-bottom': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'font-size': { xs: '0.67rem', sm: null, md: null, lg: null, xl: null },
        'line-height': { xs: '0.67rem', sm: null, md: null, lg: null, xl: null },
        'letter-spacing': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
      },
      p: {
        'margin-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'margin-bottom': { xs: '0.3rem', sm: null, md: null, lg: null, xl: null },
        'padding-top': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'padding-bottom': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
        'font-size': { xs: '1rem', sm: null, md: null, lg: null, xl: null },
        'line-height': { xs: '1rem', sm: null, md: null, lg: null, xl: null },
        'letter-spacing': { xs: '0rem', sm: null, md: null, lg: null, xl: null },
      }
    },
    layout: {
      content: {
        xs: ['margin', '1rem'],
        sm: null,
        md: null,
        lg: null,
        xl: null
      },
      grid: {
        columns: { xs: 1, sm: 2, md: 3, lg: 4, xl: null },
        gap: { xs: '1rem', sm: null, md: null, lg: null, xl: null }
      }
    },
    grid: {
      columns: { xs: 1, sm: 2, md: 3, lg: 4, xl: null },
      gap: { xs: '1rem', sm: null, md: null, lg: null, xl: null }
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
    for (const el of Object.keys(this.settings.sizes)) {
      for (const prop of Object.keys(this.settings.sizes[el])) {
        this.applySetting(size, el, prop, el, prop);
      }
    }
    this.applySetting(size, '.content', 'top', '.header', 'height');
    this.applySetting(size, '.main', 'left', '.margin', 'width');
    this.applySetting(size, '.main', 'right', '.margin', 'width');
    const gap = this.getVal(size, 'grid', 'gap');
    this.applySetting(size, '.grid div', 'margin-right', gap);
    this.applySetting(size, '.grid div', 'margin-bottom', gap);
    this.applySetting(size, '.grid', 'margin-right', '-' + gap);
    this.applySetting(size, '.grid div', 'width',
      'calc(' + 100 / this.getVal(size, 'grid', 'columns') + '% - ' + gap + ')');
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
    return this.getVal(size, setting, settingProp, 'sizes');
  }

  getVal(size: string, setting: string, settingProp: string, settingGroup: string = null) {
    const group = settingGroup ? this.settings[settingGroup] : this.settings;
    switch (size) {
      case 'xl':
        if (group[setting][settingProp].xl !== null) {
          return group[setting][settingProp].xl;
        } else if (group[setting][settingProp].lg !== null) {
          return group[setting][settingProp].lg;
        } else if (group[setting][settingProp].md !== null) {
          return group[setting][settingProp].md;
        } else if (group[setting][settingProp].sm !== null) {
          return group[setting][settingProp].sm;
        }
        break;
      case 'lg':
        if (group[setting][settingProp].lg !== null) {
          return group[setting][settingProp].lg;
        } else if (group[setting][settingProp].md !== null) {
          return group[setting][settingProp].md;
        } else if (group[setting][settingProp].sm !== null) {
          return group[setting][settingProp].sm;
        }
        break;
      case 'md':
        if (group[setting][settingProp].md !== null) {
          return group[setting][settingProp].md;
        } else if (group[setting][settingProp].sm !== null) {
          return group[setting][settingProp].sm;
        }
        break;
      case 'sm':
        if (group[setting][settingProp].sm !== null) {
          return group[setting][settingProp].sm;
        }
    }
    return group[setting][settingProp].xs;
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
    const dialogRef = this.dialog.open(TextDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        title,
        settings: this.settings.sizes[el]
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
