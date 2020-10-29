import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicUsageComponent } from './basic-usage.component';

describe('BasicUsageComponent', () => {
  let component: BasicUsageComponent;
  let fixture: ComponentFixture<BasicUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
