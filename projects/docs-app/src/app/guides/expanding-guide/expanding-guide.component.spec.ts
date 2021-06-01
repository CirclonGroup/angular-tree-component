import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandingGuideComponent } from './expanding-guide.component';

describe('ExpandingGuideComponent', () => {
  let component: ExpandingGuideComponent;
  let fixture: ComponentFixture<ExpandingGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandingGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandingGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
