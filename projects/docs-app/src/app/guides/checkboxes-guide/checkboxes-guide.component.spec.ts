import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesGuideComponent } from './checkboxes-guide.component';

describe('CheckboxesGuideComponent', () => {
  let component: CheckboxesGuideComponent;
  let fixture: ComponentFixture<CheckboxesGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxesGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxesGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
