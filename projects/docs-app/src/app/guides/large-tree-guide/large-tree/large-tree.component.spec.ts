import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeTreeComponent } from './large-tree.component';

describe('LargeTreeComponent', () => {
  let component: LargeTreeComponent;
  let fixture: ComponentFixture<LargeTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
