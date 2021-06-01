import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeTreeGuideComponent } from './large-tree-guide.component';

describe('LargeTreeGuideComponent', () => {
  let component: LargeTreeGuideComponent;
  let fixture: ComponentFixture<LargeTreeGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeTreeGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeTreeGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
