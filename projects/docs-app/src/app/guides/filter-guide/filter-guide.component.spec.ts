import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGuideComponent } from './filter-guide.component';

describe('FilterGuideComponent', () => {
  let component: FilterGuideComponent;
  let fixture: ComponentFixture<FilterGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
