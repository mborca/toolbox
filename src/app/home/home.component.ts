import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
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
      columns: { xs: 4 },
      gap: { xs: '1rem' }
    }
  };
  settings = this.defaultSettings;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.settings = window.localStorage.getItem('settings')
      ? JSON.parse(window.localStorage.getItem('settings'))
      : this.defaultSettings;
    this.applySettings('xs');
  }

  resetSettings() {
    window.localStorage.removeItem('settings');
    this.settings = this.defaultSettings;
  }

  applySettings(size: string) {
    for (const el of Object.keys(this.settings)) {
      for (const prop of Object.keys(this.settings[el])) {
        const val = this.settings[el][prop][size];
        const elems = document.querySelectorAll(el);
        for (const elem of Object.keys(elems) ) {
          this.renderer.setStyle(elems[elem], prop, val);
        }
      }
    }
    this.renderer.setStyle(document.querySelector('.content'), 'top', this.settings['.header'].height[size]);
    this.renderer.setStyle(document.querySelector('.main'), 'left', this.settings['.margin'].width[size]);
    this.renderer.setStyle(document.querySelector('.main'), 'right', this.settings['.margin'].width[size]);
    this.renderer.setStyle(document.querySelector('.grid'), 'margin-right', '-' + this.settings.grid.gap[size]);
    const cellWidth = 'calc(' + 100 / this.settings.grid.columns[size] + '% - ' + this.settings.grid.gap[size] + ')';
    const cells = document.querySelectorAll('.grid div');
    for (const cell of Object.keys(cells)) {
      this.renderer.setStyle(cells[cell], 'margin-right', this.settings.grid.gap[size]);
      this.renderer.setStyle(cells[cell], 'margin-bottom', this.settings.grid.gap[size]);
      this.renderer.setStyle(cells[cell], 'width', cellWidth);
    }
  }

  exportSettings() {

  }

  saveSettings() {
    window.localStorage.setItem('settings', JSON.stringify(this.settings));
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
    this.applySettings('xs');
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
}
