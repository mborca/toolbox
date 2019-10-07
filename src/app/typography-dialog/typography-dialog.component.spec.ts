import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypographyDialogComponent } from './typography-dialog.component';

describe('TypographyDialogComponent', () => {
  let component: TypographyDialogComponent;
  let fixture: ComponentFixture<TypographyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypographyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypographyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
