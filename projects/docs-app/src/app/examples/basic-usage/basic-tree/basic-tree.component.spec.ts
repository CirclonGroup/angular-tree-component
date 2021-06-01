import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTreeComponent } from './basic-tree.component';

describe('BasicTreeComponent', () => {
  let component: BasicTreeComponent;
  let fixture: ComponentFixture<BasicTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
