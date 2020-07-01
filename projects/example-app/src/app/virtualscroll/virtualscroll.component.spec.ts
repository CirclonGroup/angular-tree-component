import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualscrollComponent } from './virtualscroll.component';

describe('VirtualscrollComponent', () => {
  let component: VirtualscrollComponent;
  let fixture: ComponentFixture<VirtualscrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualscrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualscrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
