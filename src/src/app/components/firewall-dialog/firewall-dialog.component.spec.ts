import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallDialogComponent } from './firewall-dialog.component';

describe('FirewallDialogComponent', () => {
  let component: FirewallDialogComponent;
  let fixture: ComponentFixture<FirewallDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirewallDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirewallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
