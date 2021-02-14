import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActionsDemoComponent } from './actions-demo.component';

describe('ActionsDemoComponent', () => {
  let component: ActionsDemoComponent;
  let fixture: ComponentFixture<ActionsDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
