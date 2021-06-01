import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoScrollComponent } from './auto-scroll.component';

describe('AutoScrollComponent', () => {
  let component: AutoScrollComponent;
  let fixture: ComponentFixture<AutoScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
