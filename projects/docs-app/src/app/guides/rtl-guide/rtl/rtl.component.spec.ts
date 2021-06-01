import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtlComponent } from './rtl.component';

describe('RtlComponent', () => {
  let component: RtlComponent;
  let fixture: ComponentFixture<RtlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
