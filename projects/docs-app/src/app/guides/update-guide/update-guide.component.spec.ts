import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGuideComponent } from './update-guide.component';

describe('UpdateGuideComponent', () => {
  let component: UpdateGuideComponent;
  let fixture: ComponentFixture<UpdateGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
