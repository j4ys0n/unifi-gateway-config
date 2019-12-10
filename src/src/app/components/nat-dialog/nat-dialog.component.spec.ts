import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NatDialogComponent } from './nat-dialog.component';

describe('NatDialogComponent', () => {
  let component: NatDialogComponent;
  let fixture: ComponentFixture<NatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
