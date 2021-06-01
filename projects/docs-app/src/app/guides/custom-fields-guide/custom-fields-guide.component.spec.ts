import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldsGuideComponent } from './custom-fields-guide.component';

describe('CustomFieldsGuideComponent', () => {
  let component: CustomFieldsGuideComponent;
  let fixture: ComponentFixture<CustomFieldsGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFieldsGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFieldsGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
