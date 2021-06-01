import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropGuideComponent } from './drag-drop-guide.component';

describe('DragDropGuideComponent', () => {
  let component: DragDropGuideComponent;
  let fixture: ComponentFixture<DragDropGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
