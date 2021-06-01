import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoScrollGuideComponent } from './auto-scroll-guide.component';

describe('AutoScrollGuideComponent', () => {
  let component: AutoScrollGuideComponent;
  let fixture: ComponentFixture<AutoScrollGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoScrollGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoScrollGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
